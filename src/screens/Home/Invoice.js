import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import RNFS from 'react-native-fs';
import {PDFDocument, StandardFonts} from 'pdf-lib';
import Share from 'react-native-share';
import {Buffer} from 'buffer';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

export const createAndSharePDF = async invoiceResponse => {
  try {
    const data = invoiceResponse;
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const page = pdfDoc.addPage([600, 900]);
    const {height} = page.getSize();

    const draw = (text, x, y, size = 10, fontType = font) => {
      page.drawText(String(text ?? ''), {x, y, size, font: fontType});
    };

    let y = height - 40;

    // ------------------------------
    // 🔵 COMPANY HEADER
    // ------------------------------
    draw(data.company_details.regd_company_details, 50, y, 14, boldFont);
    y -= 20;
    draw(
      `${data.company_details.regd_address}, ${data.company_details.regd_city}`,
      50,
      y,
    );
    y -= 15;
    draw(
      `State: ${data.company_details.regd_state} - ${data.company_details.regd_zip}`,
      50,
      y,
    );
    y -= 15;
    draw(`Website: ${data.company_details.company_website}`, 50, y);
    y -= 15;
    draw(`PAN: ${data.company_details.company_pan}`, 50, y);
    y -= 15;
    draw(`CIN: ${data.company_details.company_cin}`, 50, y);
    y -= 30;

    // ------------------------------
    // 🔰 TITLE
    // ------------------------------
    draw('TAX INVOICE', 240, y, 16, boldFont);
    y -= 40;

    // ------------------------------
    // 🟩 BILL TO
    // ------------------------------
    draw('Bill To:', 50, y, 12, boldFont);
    y -= 18;

    const bill = data.bill_to;

    draw(bill.name, 50, y);
    y -= 15;
    draw(bill.address, 50, y);
    y -= 15;
    draw(`${bill.city}, ${bill.state} - ${bill.zip}`, 50, y);
    y -= 15;
    draw(`Phone: ${bill.phone}`, 50, y);
    y -= 15;
    draw(`Email: ${bill.email}`, 50, y);
    y -= 15;
    draw(`GSTIN: ${bill.gstin}`, 50, y);
    y -= 15;
    draw(`State Code: ${bill.state_code}`, 50, y);
    y -= 15;
    draw(`Place of Supply: ${bill.place_of_supply}`, 50, y);
    y -= 25;

    // ------------------------------
    // 🟦 INVOICE DETAILS RIGHT SIDE
    // ------------------------------
    let iy = height - 160;
    draw(
      `Invoice No : ${data.invoice_details.invoice_number ?? 'N/A'}`,
      350,
      iy,
    );
    iy -= 15;
    draw(`Invoice Date : ${data.invoice_details.invoice_date}`, 350, iy);
    iy -= 15;
    draw(`Total Quantity : ${data.invoice_details.total_quantity}`, 350, iy);
    iy -= 15;
    draw(
      `Tax Type : ${
        data.invoice_details.tax_type === '0' ? 'IGST' : 'CGST/SGST'
      }`,
      350,
      iy,
    );
    iy -= 15;
    draw(`Emp Code : ${data.invoice_details.emp_code ?? 'N/A'}`, 350, iy);

    // ------------------------------
    // 📦 ITEMS TABLE
    // ------------------------------
    y -= 20;

    draw('S.No', 20, y, 10, boldFont);
    draw('Description', 60, y, 10, boldFont);
    draw('IMEI / SN', 190, y, 10, boldFont);
    draw('Barcode', 300, y, 10, boldFont);
    draw('HSN', 380, y, 10, boldFont);
    draw('Qty', 430, y, 10, boldFont);
    draw('Price', 470, y, 10, boldFont);
    draw('Amount', 530, y, 10, boldFont);

    y -= 20;

    data.items.forEach(item => {
      draw(item.s_no, 25, y);
      draw(item.description, 60, y);
      draw(item.imei, 190, y);
      draw(item.barcode, 300, y);
      draw(item.hsn, 380, y);
      draw(String(item.qty), 430, y);
      draw(String(item.price_before_tax), 470, y);
      draw(String(item.total_amount), 530, y);
      y -= 20;
    });

    // ------------------------------
    // 🧮 SUMMARY
    // ------------------------------
    y -= 20;

    const sum = data.summary;

    draw(`Total Before Tax: Rs. ${sum.total_before_tax}`, 350, y);
    y -= 15;
    draw(`CGST: Rs. ${sum.total_cgst}`, 350, y);
    y -= 15;
    draw(`SGST: Rs. ${sum.total_sgst}`, 350, y);
    y -= 15;
    draw(`IGST: Rs. ${sum.total_igst}`, 350, y);
    y -= 15;

    draw(`Grand Total: Rs. ${sum.grand_total}`, 350, y, 12, boldFont);
    y -= 25;

    draw(`Amount in Words: ${sum.amount_in_words}`, 50, y, 10, boldFont);
    y -= 25;

    draw('Note: Whether tax payable under reverse charge - NO', 50, y);
    y -= 25;

    draw('Thank you for the business!', 50, y, 12, boldFont);

    // ------------------------------
    // 📄 SAVE & SHARE PDF
    // ------------------------------
    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64');

    const invoiceNo = data.invoice_details.invoice_number ?? 'no_number';
    const filePath = `${RNFS.CachesDirectoryPath}/Invoice_${invoiceNo}.pdf`;

    await RNFS.writeFile(filePath, pdfBase64, 'base64');

    await Share.open({
      url: `file://${filePath}`,
      type: 'application/pdf',
    });
  } catch (error) {
    console.log('PDF Error:', error);
  }
};

// SCREEN UI
export default function Invoice({route}) {
  const {order_id} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invoice Screen</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => createAndSharePDF(order_id)}>
        <Text style={styles.buttonText}>Download Invoice PDF</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {fontSize: 24, marginBottom: 40, fontWeight: 'bold'},
  button: {
    backgroundColor: '#1ca147',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
});
