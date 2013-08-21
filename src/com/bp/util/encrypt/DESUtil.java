package com.bp.util.encrypt;

import java.io.IOException;
import java.security.SecureRandom;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;
/**
 * DES可逆加密类，注意非对称加密性能太差
 * 不可逆加密不适用于解密
 * 加密返回的还需要注意不要生成特殊字符串
 * 
 * */


public class DESUtil {

	private byte[] desKey;

	public DESUtil(String desKey) {
		this.desKey = desKey.getBytes();
	}

	public byte[] desEncrypt(byte[] plainText) throws Exception {
		SecureRandom sr = new SecureRandom();
		byte rawKeyData[] = desKey;
		DESKeySpec dks = new DESKeySpec(rawKeyData);
		SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
		SecretKey key = keyFactory.generateSecret(dks);
		Cipher cipher = Cipher.getInstance("DES");
		cipher.init(Cipher.ENCRYPT_MODE, key, sr);
		byte data[] = plainText;
		byte encryptedData[] = cipher.doFinal(data);
		return encryptedData;
	}

	public byte[] desDecrypt(byte[] encryptText) throws Exception {
		SecureRandom sr = new SecureRandom();
		byte rawKeyData[] = desKey;
		DESKeySpec dks = new DESKeySpec(rawKeyData);
		SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
		SecretKey key = keyFactory.generateSecret(dks);
		Cipher cipher = Cipher.getInstance("DES");
		cipher.init(Cipher.DECRYPT_MODE, key, sr);
		byte encryptedData[] = encryptText;
		byte decryptedData[] = cipher.doFinal(encryptedData);
		return decryptedData;
	}

	public String encrypt(String input) throws Exception {
		return byteToHexString(desEncrypt(input.getBytes()));
	}

	public String decrypt(String input) throws Exception {
		byte[] result = stringToHexByte(input);
		return new String(desDecrypt(result));
	}
   /**因为特殊字符的问题,不再使用base64位来转化byte*/
	public static String base64Encode(byte[] s) {
		if (s == null)
			return null;
		BASE64Encoder b = new sun.misc.BASE64Encoder();
		return b.encode(s);
	}
	/**因为特殊字符的问题,不再使用base64位来转化byte*/
	public static byte[] base64Decode(String s) throws IOException {
		if (s == null)
			return null;
		BASE64Decoder decoder = new BASE64Decoder();
		byte[] b = decoder.decodeBuffer(s);
		return b;
	}
	/**
	 * 将表示16进制值的字符串转换为byte数组
	 * 
	 * @param paramString
	 *            需要转换的字符串
	 * @return 转换后的字节
	 */
	public static byte[] stringToHexByte(String paramString) {

		// 两个字符表示一个字节，所以字节数组长度是字符串长度除以2
		byte digest[] = new byte[paramString.length() / 2];

		// 采用不同的算法,加密后的数据也不相同
		for (int i = 0; i < digest.length; i++) {
			String byteString = paramString.substring(2 * i, 2 * i + 2);
			int byteValue = Integer.parseInt(byteString, 16);
			digest[i] = (byte) byteValue;
		}
		return digest;
	}

	/**
	 * 将byte数组转换为表示16进制值的字符串， 如：byte[]{8,18}转换为：0813 和 StringToHexByte(String
	 * paramString) 互为可逆的转换过程.
	 * 
	 * @param paramByte
	 *            需要转换的byte数组

	 * @return 转换后的字符串
	 */
	public static String byteToHexString(byte paramByte[]) {
		StringBuffer hexString = new StringBuffer();
		for (int i = 0; i < paramByte.length; i++) {
			String plainText = Integer.toHexString(0xff & paramByte[i]);
			if (plainText.length() < 2)
				plainText = "0" + plainText;
			hexString.append(plainText);
		}
	
		return hexString.toString();
	}
	public static void main(String[] args) throws Exception {
		String key = "abcdefgh";
		String input = "中国";
		DESUtil crypt = new DESUtil(key);
		System.out.println("Encode:" + crypt.encrypt(input));
		System.out.println("Decode:" + crypt.decrypt(crypt.encrypt(input)));
	}
}