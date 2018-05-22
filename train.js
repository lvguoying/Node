public class HomeWork {

    /**
     * 使用起始站和终点站位节点创建一个二维数组
     */
    private static int[][] arrs = {
            {0,5,0,5,7},
            {0,0,4,0,0},
            {0,0,0,8,2},
            {0,0,8,0,6},
            {0,3,0,0,0}
    };

    /**
     * 最短路径
     */
    private static String shortedPath = "";

    /**
     * 最短路径值
     */
    private static int shortedVal = Integer.MAX_VALUE;

    public static void main(String[] args){
        List<String> list1 = new ArrayList<String>();
        list1.add("A");
        list1.add("B");
        list1.add("C");
        String result1 = HomeWork.getRoute(list1);//Test1
        System.out.println(result1);

        List<String> list2 = new ArrayList<String>();
        list2.add("A");
        list2.add("D");
        String result2 = HomeWork.getRoute(list2);//Test2
        System.out.println(result2);

        List<String> list3 = new ArrayList<String>();
        list3.add("A");
        list3.add("D");
        list3.add("C");
        String result3 = HomeWork.getRoute(list3);//Test3
        System.out.println(result3);

        List<String> list4 = new ArrayList<String>();
        list4.add("A");
        list4.add("E");
        list4.add("B");
        list4.add("C");
        list4.add("D");
        String result4 = HomeWork.getRoute(list4);//Test4
        System.out.println(result4);

        List<String> list5 = new ArrayList<String>();
        list5.add("A");
        list5.add("E");
        list5.add("D");
        String result5 = HomeWork.getRoute(list5);//Test5
        System.out.println(result5);

        List<String> list6 = new ArrayList<>();
        List<String> pathList6 = HomeWork.cTocLessThen("C", "C", 3, list6);//Test6
        System.out.println(pathList6.size());

        int result7 = HomeWork.aTocWith("A", "C", 4);//Test7
        System.out.println(result7);

        int result8 = HomeWork.aTocShorted("A", "C", 0);//Test8
        System.out.println(result8);

        int result9 = HomeWork.aTocShorted("B", "B", 0);//Test9
        System.out.println(result9);

        List<String> list10 = new ArrayList<>();
        List<String> pathList10 = HomeWork.cTocValLessThen("C", "C", 0,list10);//Test10
        System.out.println(pathList10.size());
    }

    /**
     * Test1.The distance of the route A-B-C.
     * Test2.The distance of the route A-D.
     * Test3.The distance of the route A-D-C.
     * Test4.The distance of the route A-E-B-C-D.
     * Test5.The distance of the route A-E-D.
     */
    private static String getRoute(List<String> list){
        int result = 0;
        String resultStr = "";
        for (int i = 0; i < list.size() - 1; i++){
            int m = strToInt(list.get(i));
            int n = strToInt(list.get(i + 1));
            int[] arr = arrs[m];
            int path = arr[n];
            if (path > 0){
                result += path;
            } else {
                return "NO SUCH ROUTE";
            }
        }
        if (result > 0){
            resultStr = result + "";
        }else {
            resultStr = "NO SUCH ROUTE";
        }
        return resultStr;
    }

    /**
     * Test6 The number of trips starting at C and ending at C with a maximum of 3 stops.  In the sample data below, there are two such trips: C-D-C (2 stops). and C-E-B-C (3 stops).
     * @param start 起点
     * @param path 路径
     * @param maxPath 最大步数
     * @param list 路径列表
     * @return
     */
    private static List<String> cTocLessThen(String start, String path, int maxPath,List<String> list) {
        if (path.length() - 1 > maxPath){
            return list;
        }
        if (path.length() > 1 && path.endsWith(start)) {
//            System.out.println(path);
            list.add(path);
        }
        char lastChar = path.charAt(path.length()-1);
        int m = lastChar - 'A';
        for (int i = 0; i < arrs[m].length; i++){
            char ch = (char) (i + 'A');
            if (arrs[m][i] > 0){
                cTocLessThen(start,path + ch,maxPath,list);
            }
        }
        return list;
    }

    /**
     * Test7. The number of trips starting at A and ending at C with exactly 4 stops.  In the sample data below, there are three such trips: A to C (via B,C,D); A to C (via D,C,D); and A to C (via D,E,B).
     * @param start 起点
     * @param end 终点
     * @param step 步数
     * @return
     */
    private static int aTocWith(String start,String end,int step){
        int result = 0;
        String lastRoute = start;
        for (int i = 0; i < step; i++){
            String route = "";
            for (int j = 0; j < lastRoute.length(); j++){
                char ch = lastRoute.charAt(j);
                int m = ch - 'A';

                for (int n = 0; n < arrs[m].length; n++){
                    if (arrs[m][n] > 0){
                        route = route + (char)(n + 'A');
                    }
                }
            }
            lastRoute = route;
        }
        result = lastRoute.split(end).length - 1;
        return result;
    }

    /**
     * 8. The length of the shortest route (in terms of distance to travel) from A to C.
     * 9. The length of the shortest route (in terms of distance to travel) from B to B.
     * @param path 以path为起点的路径
     * @param end 终点
     * @param pathVal 路径的值
     * @return
     */
    private static int aTocShorted(String path,String end,int pathVal){
        if (path.endsWith(end) && pathVal < shortedVal && pathVal > 0) {
            shortedPath = path;
            shortedVal = pathVal;
            return pathVal;
        }
        char lastChar = path.charAt(path.length() - 1);
        int m = lastChar - 'A';
        for (int i = 0; i < arrs[m].length; i++){
            char ch = (char) (i + 'A');
            int value = arrs[m][i];
            if (value > 0){
                if (path.indexOf(ch) > 0){
                    continue;
                }else {
                    aTocShorted(path + ch,end,pathVal + value);
                }

            }
        }
        return shortedVal;
    }

    /**
     * 10. The number of different routes from C to C with a distance of less than 30.  In the sample data, the trips are: CDC, CEBC, CEBCDC, CDCEBC, CDEBC, CEBCEBC, CEBCEBCEBC.
     * @param path 路径
     * @param end 终点
     * @param pathVal 路径值
     * @param list 路径列表
     * @return
     */
    private static List<String> cTocValLessThen(String path,String end,int pathVal,List<String> list) {
        if (pathVal >= 30){
            return list;
        }
        if (pathVal > 0 && path.endsWith(end)) {
//            System.out.println(path);
            list.add(path);
        }
        char lastChar = path.charAt(path.length() - 1);
        int m = lastChar - 'A';
        for (int i = 0; i < arrs[m].length; i++) {
            char newChar = (char) (i + 'A');
            int newCost = arrs[m][i];
            if (newCost > 0) {
                cTocValLessThen(path + newChar, end, pathVal + newCost,list);
            }
        }
        return list;
    }

    /**
     * 将字符串转换成ASCII对应的数字获取二维数组坐标
     * @param str
     * @return
     */
    public static int strToInt(String str){
        char[] chars = str.toCharArray();
        int i = 0;
        for (char ch : chars){
            i = ch - 'A';
        }
        return i;
    }
}