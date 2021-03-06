package fileX;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

public class F3 {
    
    
    public static String getClassName(ZipEntry entry) {
        StringBuffer className = new StringBuffer(entry.getName().replace('/', '.'));
        return className.toString();
    }


    public static void commonFileContent(File file, DTO1 dto1) {
        try {
            Pattern pattern = Pattern.compile("import (.*?)"+dto1.getStr()+"(.*?);");
            if (file.getName().endsWith(".java")) {
                FileReader fl = new FileReader(file);
                BufferedReader bf = new BufferedReader(fl);
                String line = null;
                StringBuilder sb = new StringBuilder();
                while ((line = bf.readLine()) != null) {
                    Matcher matcher = pattern.matcher(line);
                    if (matcher.find()) {
                        dto1.setNum(dto1.getNum() + 1);
                        dto1.setFile(file.getName());
                    }
                }
                boolean flag=true;
                for (int i = 0; i < F.list.size(); i++) {
                    if (F.list.get(i).getFile1().equals(dto1.getFile1())) {
                        F.list.set(i, dto1);
                        flag=false;
                    }
                }
                if(flag)
                    F.list.add(dto1);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 读取某个文件夹下的所有文件
     */
    public static boolean readfile(String filepath, DTO1 dto1) throws FileNotFoundException,
                                                              IOException {
//        System.out.println(filepath+":"+dto1.getStr()+":"+dto1.getFile1()+":"+dto1.getFile());
        try {

            File file = new File(filepath);

            if (!file.isDirectory()) {
                commonFileContent(file, dto1);
            } else if (file.isDirectory()) {
                String[] filelist = file.list();
                for (int i = 0; i < filelist.length; i++) {
                    File readfile = new File(filepath + "\\" + filelist[i]);
                    if (!readfile.isDirectory()) {
                        commonFileContent(readfile, dto1);
                    } else if (readfile.isDirectory()) {
                        readfile(filepath + "\\" + filelist[i], dto1);
                    }
                }

            }

        } catch (FileNotFoundException e) {
            System.out.println("readfile()   Exception:" + e.getMessage());
        }
        return true;
    }
    
    public static void main(String args[]) {
        String thisClassName="abc.class".substring(0, "abc.class".indexOf(".class"));
        System.out.println(thisClassName);
    }

}
