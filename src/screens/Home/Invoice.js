import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';

const Invoice = () => {
  const products = [
    {
      sno: 1,
      description: 'Second Hand iPhone 6 (1GB/32GB)',
      imei: '1234567890123456',
      barcode: 'MT000101',
      grade: 'A2',
      hsn: '85171290',
    },
    {
      sno: 2,
      description: 'Second Hand Samsung Galaxy S21 (8GB/128GB)',
      imei: '9876543210987654',
      barcode: 'MT000102',
      grade: 'A2',
      hsn: '75135460',
    },
    {
      sno: 3,
      description: 'Second Hand Google Pixel 5 (8GB/128GB)',
      imei: '5432167890123456',
      barcode: 'MT000103',
      grade: 'A3',
      hsn: '96325874',
    },
    {
      sno: 4,
      description: 'Second Hand OnePlus 8T (8GB/32GB)',
      imei: '3216549870123456',
      barcode: 'MT000104',
      grade: 'A1',
      hsn: '85274196',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        /> */}
        <View style={{ flex: 1 }}>
          <Text style={styles.companyName}>Sarvabhishta E-waste Management Pvt. Ltd.</Text>
          <Text style={styles.address}>
            Warehouse Address: A-272K, First Floor, Sector 10, Noida, Gautam Buddha Nagar, Uttar Pradesh 201301{'\n'}
            Registered Address: D-6 KH No.633 Laxmi Nagar, East Delhi, Delhi-110092
          </Text>
          <Text style={styles.details}>
            Website: www.mobitrade.in | Email: accounts@mobitrade.in | Phone: 8700172840
          </Text>
          <Text style={styles.details}>
            CIN: U74900DL2018PTC343979 | GSTIN: 09AABCS3150L1Z7
          </Text>
        </View>
      </View>

      <Text style={styles.taxTitle}>Tax Invoice</Text>

      {/* Bill To / Ship To */}
      <View style={styles.sectionRow}>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Bill To</Text>
          <Text style={styles.boxText}>
            A-123, Test Road, Test Colony, Paschim Vihar, Delhi-110096{'\n'}
            PHONE: +91 999 999 9999{'\n'}
            EMAIL: info@e-wasteenterprises.com{'\n'}
            GSTIN: 19AABCS9080ABCD{'\n'}
            PAN: BQPC1234J{'\n'}
            Place of supply: Delhi{'\n'}
            State Code: 19
          </Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Ship To</Text>
          <Text style={styles.boxText}>
            Test Buyer 2{'\n'}
            A-123, Test Road, Test Colony, Paschim Vihar, Delhi-110096{'\n'}
            PHONE: +91 999 999 9999{'\n'}
            EMAIL: info@e-wasteenterprises.com{'\n'}
            GSTIN: 19AABCS9080ABCD{'\n'}
            PAN: BQPC1234J{'\n'}
            Place of supply: Delhi{'\n'}
            State Code: 19
          </Text>
        </View>
      </View>

      {/* Invoice Info */}
      <View style={styles.invoiceInfo}>
        <Text>Invoice No: <Text style={styles.bold}>UP2022-234076</Text></Text>
        <Text>Invoice Date: <Text style={styles.bold}>28/08/2022</Text></Text>
        <Text>Total Quantity: <Text style={styles.bold}>4</Text></Text>
        <Text>Emp Code: <Text style={styles.bold}>MT0101</Text></Text>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.cell, styles.sno]}>S.No.</Text>
        <Text style={[styles.cell, styles.desc]}>Description of Goods</Text>
        <Text style={[styles.cell, styles.small]}>IMEI</Text>
        <Text style={[styles.cell, styles.small]}>Barcode</Text>
        <Text style={[styles.cell, styles.small]}>Grade</Text>
        <Text style={[styles.cell, styles.small]}>HSN</Text>
      </View>

      {/* Table Rows */}
      {products.map(item => (
        <View style={styles.tableRow} key={item.sno}>
          <Text style={[styles.cell, styles.sno]}>{item.sno}</Text>
          <Text style={[styles.cell, styles.desc]}>{item.description}</Text>
          <Text style={[styles.cell, styles.small]}>{item.imei}</Text>
          <Text style={[styles.cell, styles.small]}>{item.barcode}</Text>
          <Text style={[styles.cell, styles.small]}>{item.grade}</Text>
          <Text style={[styles.cell, styles.small]}>{item.hsn}</Text>
        </View>
      ))}

      {/* Total */}
      <View style={styles.totalBox}>
        <Text style={styles.totalText}>
          Amount in Words: <Text style={styles.bold}>Thirteen Thousand Six Hundred Twenty Four Rupees Only</Text>
        </Text>
        <Text style={styles.totalText}>Total: ₹13,500</Text>
      </View>

      {/* Tax */}
      <View style={styles.taxSection}>
        <Text style={styles.bold}>Tax Bifurcation</Text>
        <View style={styles.taxRow}>
          <Text style={styles.taxCell}>IGST (18%)</Text>
          <Text style={styles.taxCell}>CGST (9%)</Text>
          <Text style={styles.taxCell}>SGST (9%)</Text>
          <Text style={styles.taxCell}>Total Tax</Text>
        </View>
        <View style={styles.taxRow}>
          <Text style={styles.taxCell}>124</Text>
          <Text style={styles.taxCell}>0</Text>
          <Text style={styles.taxCell}>0</Text>
          <Text style={styles.taxCell}>124</Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>Thank you for your business.</Text>
      <View style={styles.signatureBox}>
        <Text style={styles.signLabel}>For Sarvabhishta E-waste Management Pvt. Ltd.</Text>
        {/* <Image
          source={require('../../assets/images/stamp.png')}
          style={styles.stamp}
        /> */}
        <Text style={styles.signName}>Authorized Signatory</Text>
      </View>

      {/* Terms */}
      <View style={styles.termsBox}>
        <Text style={styles.bold}>Terms & Conditions</Text>
        <Text style={styles.termsText}>
          1. Value of supply is determined under section 15(5) of CGST rules.{'\n'}
          2. Goods once sold cannot be returned. Buyer assumes full responsibility.{'\n'}
          3. Buyer agrees to hold seller harmless from any claims or damages.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Invoice;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  logo: { width: 60, height: 60, marginRight: 10 },
  companyName: { fontSize: 16, fontWeight: '700', color: '#000' },
  address: { fontSize: 12, color: '#444', marginTop: 2 },
  details: { fontSize: 12, color: '#444' },
  taxTitle: {
    textAlign: 'center',
    color: '#00A884',
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 6,
  },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  box: { flex: 1, borderWidth: 1, borderColor: '#ccc', margin: 4, padding: 8, borderRadius: 6 },
  boxTitle: { fontWeight: '700', fontSize: 13, color: '#000' },
  boxText: { fontSize: 12, color: '#444', marginTop: 4 },
  invoiceInfo: { marginVertical: 8, padding: 8, borderWidth: 1, borderColor: '#ddd', borderRadius: 6 },
  bold: { fontWeight: '700', color: '#000' },
  tableHeader: { flexDirection: 'row', backgroundColor: '#f3f3f3', borderWidth: 1, borderColor: '#ccc' },
  tableRow: { flexDirection: 'row', borderWidth: 1, borderColor: '#ccc' },
  cell: { borderRightWidth: 1, borderColor: '#ccc', padding: 4, fontSize: 11, color: '#000' },
  sno: { width: '8%' },
  desc: { width: '38%' },
  small: { width: '18%' },
  totalBox: { marginTop: 10, padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 6 },
  totalText: { fontSize: 13, marginVertical: 2 },
  taxSection: { marginTop: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 6 },
  taxRow: { flexDirection: 'row', borderTopWidth: 1, borderColor: '#ccc' },
  taxCell: { flex: 1, textAlign: 'center', padding: 4, fontSize: 12 },
  footerText: { textAlign: 'center', fontSize: 13, fontWeight: '600', marginTop: 10 },
  signatureBox: { alignItems: 'center', marginTop: 16 },
  stamp: { width: 90, height: 90, marginVertical: 8, opacity: 0.8 },
  signLabel: { fontSize: 13, color: '#000' },
  signName: { fontSize: 12, fontWeight: '600' },
  termsBox: { marginTop: 10, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 6 },
  termsText: { fontSize: 12, color: '#444', marginTop: 4, lineHeight: 18 },
});
