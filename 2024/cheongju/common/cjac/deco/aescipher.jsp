<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="javax.crypto.Cipher"%>
<%@ page import="javax.crypto.spec.IvParameterSpec"%>
<%@ page import="javax.crypto.spec.SecretKeySpec"%>
<%!
String keyString = "1111111111111111";
String initialVectorParam = "2222222222222222";

String encrypt(String str) throws Exception {
    String returnVal = "";
    try {
        SecretKeySpec key = new SecretKeySpec(keyString.getBytes(), "AES");
        IvParameterSpec initalVector = new IvParameterSpec(initialVectorParam.getBytes());
        Cipher cipher = Cipher.getInstance("AES/CFB8/NoPadding");
        
        // ///////////// encrypt /////////////////
        cipher.init(Cipher.ENCRYPT_MODE, key, initalVector);
        byte[] test = cipher.doFinal(str.getBytes("UTF-8"));
        returnVal = bytes2Hex(test);
    } catch(Exception e) {
        System.out.println("Connection Exception occurred");
    }
    return returnVal;
}

String decrypt(String str) throws Exception {
    String returnVal = "";
    try {
        SecretKeySpec key = new SecretKeySpec(keyString.getBytes(), "AES");
        IvParameterSpec initalVector = new IvParameterSpec(initialVectorParam.getBytes());
        Cipher cipher = Cipher.getInstance("AES/CFB8/NoPadding");
        
        // ///////////// decrypt /////////////////
        cipher.init(Cipher.DECRYPT_MODE, key, initalVector);
        byte[] encrypted = hex2byte(str);
        byte[] decryptedValue = cipher.doFinal(encrypted);
        returnVal = new String(decryptedValue, "UTF-8");
    } catch(Exception e) {
        System.out.println("Connection Exception occurred");
    }
    return returnVal;
}

static byte[] hex2byte(String s) {
    if(s == null) return null;
    int l = s.length();
    if(l % 2 == 1) return null;
    byte[] b = new byte[l / 2];
    for(int i = 0; i < l / 2; i++) {
        b[i] = (byte)Integer.parseInt(s.substring(i * 2, i * 2 + 2), 16);
    }
    return b;
}

static String byte2Hex(byte b) {
    String[] HEX_DIGITS = {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"};
    int nb = b & 0xFF;
    int i_1 = (nb >> 4) & 0xF;
    int i_2 = nb & 0xF;
    return HEX_DIGITS[i_1] + HEX_DIGITS[i_2];
}

static String bytes2Hex(byte[] b) {
    StringBuffer sb = new StringBuffer(b.length * 2);
    for(int x = 0; x < b.length; x++) {
        sb.append(byte2Hex(b[x]));
    }
    return sb.toString();
}
%>
<%--
String data = "가나다|MMM"; 
String encStr = encrypt(data);
out.println(encStr);
--%>