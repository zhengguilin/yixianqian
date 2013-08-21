package fileX;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

public class F4 {
    static Pattern pattern = Pattern.compile("id=\"(.*?)\"");
    public static List<DTO1> list=new ArrayList<DTO1>();
    public static void commonFileContent(File file) {
        try {
            if (file.getName().endsWith(".jar")) {
                
                ZipFile zip = new ZipFile(file);
                
                Enumeration entries = zip.entries();
                while (entries.hasMoreElements()) {
                    ZipEntry entry = (ZipEntry) entries.nextElement();
                    String str1 = entry.getName();
                    if(str1.endsWith(".class")) {
                        String thisClassName=str1.substring(0, str1.indexOf(".class"));
                        DTO1 dto=new DTO1();
                        dto.setFile1(file.getName());
                        dto.setStr(thisClassName);
                        dto.setPath(file.getAbsolutePath());
                        F3.readfile("D:/workspace/workspace_trunk1/saiku/src/main/java", dto);
                    }
                  
                }
            }
        } catch (Exception e) {
          e.printStackTrace();
        }
    }

    /**
     * 读取某个文件夹下的所有文件
     */
    public static boolean readfile(String filepath) throws FileNotFoundException, IOException {
        try {

            File file = new File(filepath);
            
            if (!file.isDirectory()) {
                commonFileContent(file);
            } else if (file.isDirectory()) {
                String[] filelist = file.list();
                for (int i = 0; i < filelist.length; i++) {
                    File readfile = new File(filepath + "\\" + filelist[i]);
                    if (!readfile.isDirectory()) {
                        commonFileContent(readfile);
                    } else if (readfile.isDirectory()) {
                        readfile(filepath + "\\" + filelist[i]);
                    }
                }

            }

        } catch (FileNotFoundException e) {
            System.out.println("readfile()   Exception:" + e.getMessage());
        }
        return true;
    }
    

    public static void main(String args[]) {
        try {
            F4.readfile("D:/workspace/workspace_trunk1/saiku/WebContent/WEB-INF/lib");
            FileWriter fw=new FileWriter("d:/test2.txt");
            for (int i=0;i<F4.list.size();i++) {
                if(F4.list.get(i).getNum()==0) {
                    fw.write(F4.list.get(i).getPath()+":"+F4.list.get(i).getFile1()+":"+F4.list.get(i).getFile()+"\r\n");
                }
            }
            fw.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
