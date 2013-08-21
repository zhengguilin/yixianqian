package fileX;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class F {
    static Pattern pattern = Pattern.compile("id=\"(.*?)\"");
    public static List<DTO1> list=new ArrayList<DTO1>();
    public static void commonFileContent(File file) {
        try {
            if (file.getName().endsWith(".xml")) {
               
                FileReader fl = new FileReader(file);
                BufferedReader bf = new BufferedReader(fl);
                String line = null;
                while ((line = bf.readLine()) != null) {
                    Matcher matcher = pattern.matcher(line);
                    if (matcher.find()) {
                        String a=matcher.group(1);
                        DTO1 dto=new DTO1();
                        dto.setStr(a);
                        dto.setFile1(file.getName());
                        dto.setPath(file.getAbsolutePath());
                        F2.readfile("D:/workspace/workspace_trunk1/branch-quartz-maven/src/main/java/com", dto);
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
            F.readfile("D:/workspace/workspace_trunk1/branch-quartz-maven/src");
            FileWriter fw=new FileWriter("d:/test.txt");
            for (int i=0;i<F.list.size();i++) {
                if(F.list.get(i).getNum()==0) {
                    fw.write(F.list.get(i).getPath()+":"+F.list.get(i).getFile1()+":"+F.list.get(i).getFile()+"\r\n");
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
