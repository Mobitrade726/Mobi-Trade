import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../../../constants/Header';
import {
  fetchOrderDetailsAPI,
  fetchSalesInvoiceAPI,
} from '../../../../redux/slices/orderSlice';
import {createAndSharePDF} from '../../../../screens/Home/Invoice';

const MyorderDetails = ({navigation, route}) => {
  const {order_id, order_id_Number} = route.params;
  const dispatch = useDispatch();
  const {orderDetails, invoiceData, loading, error} = useSelector(
    state => state.orders,
  );
  const [returnModal, setReturnModal] = useState(false);

  const downloadInvoice = async orderId => {
    await dispatch(fetchSalesInvoiceAPI(orderId));

    setTimeout(() => {
      if (invoiceData) {
        createAndSharePDF(invoiceData);
      } else {
        console.log('Invoice not loaded yet');
      }
    }, 500);
  };

  useEffect(() => {
    dispatch(fetchOrderDetailsAPI(order_id));
  }, [dispatch, order_id]);

  if (loading) {
    return (
      <View style={styles.loaderBox}>
        <ActivityIndicator size="large" color="#1C9C48" />
      </View>
    );
  }
  if (error) return <Text>Error: {error}</Text>;
  if (!orderDetails) return <Text>No Order Found</Text>;

  // GST label logic
  const gstLabel =
    parseFloat(orderDetails?.checkout_detail?.igst_tax_amount) > 0
      ? '18%'
      : parseFloat(orderDetails?.checkout_detail?.cgst_tax_amount) > 0
      ? '9%'
      : '0%';

  // GST amount logic
  let gstAmount = '0.00';
  if (gstLabel === '18%') {
    gstAmount = orderDetails?.checkout_detail?.igst_tax_amount || '0.00';
  } else if (gstLabel === '9%') {
    const cgst =
      parseFloat(orderDetails?.checkout_detail?.cgst_tax_amount) || 0;
    const sgst =
      parseFloat(orderDetails?.checkout_detail?.sgst_tax_amount) || 0;
    gstAmount = (cgst + sgst).toFixed(2);
  }

  // Grand total
  const amountBeforeTax = orderDetails?.checkout_detail?.amount_before_tax || 0;
  const grandTotal =
    orderDetails?.checkout_detail?.grand_total ||
    (amountBeforeTax + parseFloat(gstAmount)).toFixed(2);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Header
        title={`#${orderDetails?.order_id}`}
        navigation={navigation}
        showBack={true}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        {/* --- Green Status Bar --- */}
        <View style={styles.greenStatusBox}>
          <Text style={styles.greenStatusText}>Your order is delivered</Text>
          <Image
            source={require('../../../../../assets/images/orderdelever.png')}
            style={styles.statusIcon}
          />
        </View>

        {/* --- Order Number + Tracking --- */}
        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Order Number</Text>
            <Text style={styles.infoValue}>#{order_id_Number}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Tracking Number</Text>
            <Text style={styles.infoValue}>
              {orderDetails?.awb_details || '—'}
            </Text>
          </View>
        </View>

        {/* --- Relationship Manager --- */}
        <View style={styles.managerBox}>
          {/* Manager Icon */}
          <Ionicons name="person-circle-outline" size={45} color="#0A84FF" />

          {/* Manager Info (Middle Text) */}
          <View style={styles.managerInfo}>
            <Text style={styles.managerLabel}>{orderDetails?.relationship_manager_name || '-'}</Text>
            <Text style={styles.managerName}>{orderDetails?.buyer_name}</Text>
          </View>

          {/* Contact Info (Right Side) */}
          <View style={styles.managerContact}>
            <View style={styles.contactRow}>
              <Ionicons name="call-outline" size={16} color="#555" />
              <Text style={styles.managerDetail}>{orderDetails?.buyer_contact}</Text>
            </View>

            <View style={[styles.contactRow, {marginTop: 4}]}>
              <Ionicons name="mail-outline" size={16} color="#555" />
              <Text style={styles.managerDetail}>{orderDetails?.buyer_email}</Text>
            </View>
          </View>
        </View>

        {/* --- Address Box --- */}
        <View style={styles.addressBox}>
          <Ionicons name="location-outline" size={24} color="#000" />
          <View style={{marginLeft: 10}}>
            <Text style={styles.addressLabel}>Deliver to</Text>
            <Text style={styles.addressValue}>
              {orderDetails?.buyer_address || 'N/A'}
            </Text>
          </View>
        </View>

        {/* --- PRODUCT LIST --- */}
        <Text style={styles.sectionTitle}>Product list</Text>

        {orderDetails?.item_details?.map((product, index) => (
          <View key={index} style={styles.productCard}>
            {/* LEFT TEXT */}
            <View style={{flex: 1}}>
              <Text style={styles.gradeText}>Grade A2</Text>
              <Text style={styles.productName}>{product.model_name}</Text>
              <Text style={styles.productPrice}>₹{product.price}</Text>

              <TouchableOpacity
                onPress={() => setReturnModal(true)}
                style={styles.returnButton}>
                <Text style={styles.returnText}>Return</Text>
              </TouchableOpacity>
            </View>

            {/* IMAGE */}
            <Image
              source={{uri: product.model_image}}
              style={styles.productImage}
            />
          </View>
        ))}

        {/* --- BILL DETAILS --- */}
        <Text style={styles.sectionTitle}>Bill Details</Text>

        {orderDetails?.bill_details?.map((item, index) => (
          <View key={index} style={styles.billRow}>
            <Text style={styles.billLabel}>{item.model_name}</Text>
            <Text style={styles.billValue}>₹{item.price}</Text>
          </View>
        ))}

        <View style={styles.divider} />

        <View style={styles.billRow}>
          <Text style={styles.billLabel}>GST({gstLabel})</Text>
          <Text style={styles.billValue}>₹264</Text>
        </View>

        <View style={styles.billRow}>
          <Text style={styles.billLabel}>Subtotal</Text>
          <Text style={styles.billValue}>₹{amountBeforeTax}</Text>
        </View>

        <View style={styles.billRow}>
          <Text style={styles.billTitleBold}>Total</Text>
          <Text style={styles.billTitleBold}>₹{grandTotal}</Text>
        </View>

        {/* --- Footer Buttons --- */}
        <View style={styles.footerRow}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TrackOrder', {
                order_id: order_id,
                order_id_Number: order_id_Number,
              })
            }
            style={styles.trackOrderBtn}>
            <Text style={styles.trackBtnText}>Track Order</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => downloadInvoice(order_id_Number)}
            style={styles.invoiceBtn}>
            <Text style={styles.invoiceBtnText}>Download Invoice</Text>
          </TouchableOpacity>

          {/* ---------- Modal ---------- */}
          <Modal
            visible={returnModal}
            transparent
            animationType="fade"
            onRequestClose={() => setReturnModal(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalBox}>
                {/* Green Circle with Icon */}
                <View style={styles.greenCircle}>
                  <Ionicons name="help-outline" size={32} color="#3FAE49" />
                </View>

                <Text style={styles.modalTitle}>Request Return</Text>
                <Text style={styles.modalMsg}>
                  Are you sure? You want to return this product
                </Text>

                {/* Confirm Button */}
                <View style={{flexDirection: 'row', gap: 20}}>
                  <TouchableOpacity
                    onPress={() => setReturnModal(false)}
                    style={styles.cancleBtn}>
                    <Text style={styles.concelText}>No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.confirmBtn}
                    onPress={() => {
                      setReturnModal(false); // modal hide
                      navigation.navigate('ReturnRequest'); // navigate
                    }}>
                    <Text style={styles.confirmText}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyorderDetails;

/* ---------------------- STYLES ---------------------- */

const styles = StyleSheet.create({
  container: {paddingHorizontal: 16, paddingBottom: 40},

  loaderBox: {flex: 1, justifyContent: 'center', alignItems: 'center'},

  /* Top Status Bar */
  greenStatusBox: {
    backgroundColor: '#1C9C48',
    padding: 16,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  greenStatusText: {color: '#fff', fontSize: 16, fontWeight: '700', flex: 1},
  statusIcon: {width: 50, height: 40, resizeMode: 'contain'},

  /* Order / Tracking Info */
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoBox: {
    flexDirection: 'column',
    backgroundColor: '#F7F7F7',
    padding: 12,
    borderRadius: 12,
    width: '48%',
  },
  managerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF5FF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
  },

  managerInfo: {
    marginLeft: 12,
    flex: 1, // pushes contact info to right
  },

  managerLabel: {
    fontSize: 12,
    color: '#666',
  },

  managerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    marginTop: 2,
  },

  managerContact: {
    alignItems: 'flex-end',
  },

  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  managerDetail: {
    fontSize: 12,
    color: '#000',
    marginLeft: 4,
  },

  infoLabel: {fontSize: 12, color: '#555'},
  infoValue: {fontSize: 12, fontWeight: '700', marginTop: 4},

  /* Address */
  addressBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 14,
  },
  addressLabel: {color: '#555', fontSize: 12},
  addressValue: {fontSize: 14, fontWeight: '700', color: '#000', width: '90%'},

  /* Product List */
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 14,
    color: '#000',
  },

  productCard: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingRight: 10,
  },

  gradeText: {fontSize: 12, color: '#8A8A8A'},
  productName: {fontSize: 15, fontWeight: '700', color: '#000', marginTop: 4},
  productPrice: {fontSize: 15, color: '#000', marginTop: 2},

  productImage: {
    height: 90,
    width: 90,
    borderRadius: 12,
    resizeMode: 'cover',
    backgroundColor: '#e0e0e0',
  },

  returnButton: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#11A5D7',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 18,
    alignSelf: 'flex-start',
  },
  returnText: {color: '#11A5D7', fontWeight: '600'},

  /* Billing */
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  billLabel: {fontSize: 14, color: '#444'},
  billValue: {fontSize: 14, color: '#000', fontWeight: '600'},
  billTitleBold: {fontSize: 16, fontWeight: '700', color: '#000'},

  divider: {height: 1, backgroundColor: '#DDD', marginVertical: 10},

  /* Footer Buttons */
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  trackOrderBtn: {
    borderWidth: 1.5,
    borderColor: '#1C9C48',
    paddingVertical: 12,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  trackBtnText: {color: '#1C9C48', fontWeight: '700'},

  invoiceBtn: {
    borderWidth: 1.5,
    borderColor: '#11A5D7',
    paddingVertical: 12,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  invoiceBtnText: {color: '#11A5D7', fontWeight: '700'},

  feedbackBtn: {
    backgroundColor: '#1C9C48',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 18,
    alignItems: 'center',
  },
  feedbackText: {color: '#fff', fontWeight: '700', fontSize: 16},
  /* MODAL DESIGN */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '82%',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 18,
    alignItems: 'center',
  },
  greenCircle: {
    width: 70,
    height: 70,
    borderRadius: 70,
    backgroundColor: '#E0F5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3FAE49',
    marginTop: 5,
  },
  modalMsg: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    width: '80%',
  },
  confirmBtn: {
    backgroundColor: '#3FAE49',
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 22,
  },
  cancleBtn: {
    backgroundColor: 'red',
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 22,
  },
  confirmText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
