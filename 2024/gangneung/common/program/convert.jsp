<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.BufferedReader" %>
<%@ page import="java.io.FileInputStream" %>
<%@ page import="java.io.InputStreamReader" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.util.TreeMap" %>
<%@ page import="org.jsoup.Jsoup" %>
<%@ page import="org.jsoup.nodes.Document" %>
<%@ page import="org.jsoup.nodes.Element" %>
<%@ page import="org.jsoup.select.Elements" %>
<%!

public class Link {

	private String id;
	private String depth;
	private String name;
	private String link;
	private String parentId;
	
	public String getDepth() {
		return depth;
	}
	public void setDepth(String depth) {
		this.depth = depth;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "Link [id=" + id + ", depth=" + depth + ", name=" + name + ", link=" + link + ", parentId=" + parentId
				+ "]";
	}
	public String getParentId() {
		return parentId;
	}
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
	
}

	public TreeMap<String, Link> getOrgData(String filePath) {
		
		Document doc = Jsoup.parseBodyFragment(getFileContents(filePath));

		HashMap<String, Link> map = new HashMap<String, Link>();
		
		int depth1 = -1;
		int depth2 = 0;
		int depth3 = 0;
		Elements elements = doc.getAllElements();
		Iterator<Element> itr = elements.iterator();
		while( itr.hasNext() ) {
			Element element = itr.next();
			if( "h3".equals(element.tagName()) ) {
				depth1++;
				depth2 = 0;
				depth3 = 0;
				String depth = String.valueOf(depth1);
				element.attr("depth", depth);
				Element a = element.select("a").first();
				Link link = new Link();
				link.setId(depth);
				link.setDepth("1");
				if( null != a ) {
					String href = a.attr("href");
					link.setName(a.text().trim());
					link.setLink(href);
				} else {
					link.setName(element.text());
				}
				map.put(depth, link);
			} else if( "p".equals(element.tagName()) ) {
				depth2++;
				depth3 = 0;
				String depth = depth1 + "-" + depth2;
				element.attr("depth", String.valueOf(depth));
				Element a = element.select("a").first();
				Link link = new Link();
				link.setId(depth);
				link.setDepth("2");
				if( null != a ) {
					String href = a.attr("href");
					link.setName(a.text().trim());
					link.setLink(href);
				} else {
					link.setName(element.text());
				}
				link.setParentId(String.valueOf(depth1));
				map.put(depth, link);
			} else if( "li".equals(element.tagName()) ) {
				depth3++;
				String depth = depth1 + "-" + depth2 + "-" + depth3;
				element.attr("depth", String.valueOf(depth));
				Element a = element.select("a").first();
				Link link = new Link();
				link.setId(depth);
				link.setDepth("3");
				if( null != a ) {
					String href = a.attr("href");
					link.setName(a.text().trim());
					link.setLink(href);
				} else {
					link.setName(element.text());
				}
				link.setParentId(depth1 + "-" + depth2);
				map.put(depth, link);
			}
		}

		//System.out.println(doc.html());
		
		TreeMap<String,Link> tm = new TreeMap<String,Link>(map);
		
		Iterator<String> it = tm.keySet().iterator();
		while( it.hasNext() ) {
			String key = it.next();
			Link link = tm.get(key);
			System.out.println(link);
		}

		return tm;
		
	}
	
	public String getFileContents(String file) {
		
		String enter = System.getProperty("line.separator");
		
		StringBuffer buf = new StringBuffer();
		try {
			BufferedReader in = new BufferedReader( new InputStreamReader( new FileInputStream(file), "UTF-8") );
			String line = null;
			while((line = in.readLine()) != null) {
				buf.append(line);
				buf.append(enter);				
			}
			in.close();
		} catch(Exception e) {
			e.printStackTrace();
		}
		return buf.toString();	
		
	}
%>
<%

		String[] arrHead = {"I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII"};
		
		String orgFilePath = "/data/webapp/NeoCMS/repository/www/contents/20161230/74.html";
		
		TreeMap<String, Link> map = getOrgData(orgFilePath);

		Iterator<String> it = map.keySet().iterator();
		while( it.hasNext() ) {
			String key = it.next();
			Link link = map.get(key);
			out.println(link);
		}

%>

<div class="file_list type2"> 
 <ul class="clearfix"> 
<%
Iterator<String> it2 = map.keySet().iterator();
while( it2.hasNext() ) {
	String key = it2.next();
	Link link = map.get(key);
	String id = link.getId();
	if( "1".equals(link.getDepth()) ) {
		if( "0".equals(id) ) continue;
		boolean lowDepth = false;
		Iterator<String> it3 = map.keySet().iterator();
		while( it3.hasNext() ) {
			String key3 = it3.next();
			Link link3 = map.get(key3);
			String parent3 = link3.getParentId();
			if( null != parent3 && id.equals(parent3) ) {
				lowDepth = true;
				break;
			}
		}
		
%>
  <li> 
   <div class="file_wrap"> 
    <div class="file_title">
      <%= arrHead[Integer.parseInt(link.getId())-1] %> <%= link.getName() %> 
<% if( null != link.getLink() ) { %>
     <div class="down_view"> 
      <a href="<%= link.getLink() %>" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
      <a href="<%= link.getLink() %>" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
     </div> 
<% }
	if( lowDepth ) {
%>
   <div class="file_detail_list"> 
    <ul class="file_exist clearfix align_count3">
<%
Iterator<String> it4 = map.keySet().iterator();
while( it3.hasNext() ) {
	String key4 = it4.next();
	Link link4 = map.get(key4);
%>
     <li> 
      <div>
        <%= link4.getName() %>
       <div class="file_btn"> 
        <i class="vertical_line"></i> 
        <div class="down_view"> 
         <a href="<%= link4.getLink() %>" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
         <a href="<%= link4.getLink() %>" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
        </div> 
       </div> 
      </div>
     </li> 
<% } %>
    </ul>
   </div>
<%
	}
%>
    </div> 
   </div>
  </li> 
<%
	}
}
%>
  <li> 
   <div class="file_wrap"> 
    <div class="file_title">
      I 예산총칙 
     <div class="down_view" depth="1"> 
      <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
      <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
     </div> 
    </div> 
   </div> </li> 
  <li> 
   <div class="file_wrap"> 
    <div class="file_title">
      II 회계별 예산규모 
     <div class="down_view" depth="2"> 
      <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
      <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
     </div> 
    </div> 
   </div> </li> 
  <li> 
   <div class="file_wrap"> 
    <div class="file_title">
      III 기준인건비 세출총괄표 
     <div class="down_view" depth="3"> 
      <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
      <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
     </div> 
    </div> 
   </div> </li> 
  <li> 
   <div class="file_wrap"> 
    <div class="file_title">
      IV 세입총괄표 
     <div class="down_view" depth="4"> 
      <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
      <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
     </div> 
    </div> 
   </div> 
   <div class="file_detail_list"> 
    <ul class="file_exist clearfix align_count3"> 
     <li> 
      <div>
        세입총괄표(일반) 
       <div class="file_btn"> 
        <i class="vertical_line"></i> 
        <div class="down_view" depth="5"> 
         <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
         <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
        </div> 
       </div> 
      </div> </li> 
     <li> 
      <div>
        세입총괄표(공기업) 
       <div class="file_btn"> 
        <i class="vertical_line"></i> 
        <div class="down_view" depth="6"> 
         <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
         <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
        </div> 
       </div> 
      </div> </li> 
     <li> 
      <div>
        세입총괄표(기타) 
       <div class="file_btn"> 
        <i class="vertical_line"></i> 
        <div class="down_view" depth="7"> 
         <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
         <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
        </div> 
       </div> 
      </div> </li> 
    </ul> 
   </div> </li> 
  <li> 
   <div class="file_wrap"> 
    <div class="file_title">
     V 기능별세출총괄표
    </div> 
   </div> 
   <div class="file_detail_list"> 
    <ul class="file_exist clearfix align_count3"> 
     <li> 
      <div>
        기능별세출총괄(일반) 
       <div class="file_btn"> 
        <i class="vertical_line"></i> 
        <div class="down_view" depth="8"> 
         <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
         <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
        </div> 
       </div> 
      </div> </li> 
     <li> 
      <div>
        기능별세출총괄(공기업) 
       <div class="file_btn"> 
        <i class="vertical_line"></i> 
        <div class="down_view" depth="9"> 
         <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
         <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
        </div> 
       </div> 
      </div> </li> 
     <li> 
      <div>
        기능별세출총괄(기타) 
       <div class="file_btn"> 
        <i class="vertical_line"></i> 
        <div class="down_view" depth="10"> 
         <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
         <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
        </div> 
       </div> 
      </div> </li> 
    </ul> 
   </div> </li> 
  <li> 
   <div class="file_wrap"> 
    <div class="file_title">
     VI 조직별세출총괄
    </div> 
   </div> 
   <div class="file_detail_list"> 
    <ul class="file_exist clearfix align_count3"> 
     <li> 
      <div>
        조직별세출총괄(일반) 
       <div class="file_btn"> 
        <i class="vertical_line"></i> 
        <div class="down_view" depth="11"> 
         <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
         <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
        </div> 
       </div> 
      </div> </li> 
     <li> 
      <div>
        조직별세출총괄(공기업) 
       <div class="file_btn"> 
        <i class="vertical_line"></i> 
        <div class="down_view" depth="12"> 
         <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
         <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
        </div> 
       </div> 
      </div> </li> 
     <li> 
      <div>
        조직별세출총괄(기타) 
       <div class="file_btn"> 
        <i class="vertical_line"></i> 
        <div class="down_view" depth="13"> 
         <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
         <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
        </div> 
       </div> 
      </div> </li> 
    </ul> 
   </div> </li> 
  <li> 
   <div class="file_wrap"> 
    <div class="file_title">
     VII 성질별세출총괄
    </div> 
   </div> 
   <div class="file_detail_list"> 
    <ul class="file_exist clearfix align_count3"> 
     <li> 
      <div>
        성질별세출총괄(일반) 
       <div class="file_btn"> 
        <i class="vertical_line"></i> 
        <div class="down_view" depth="14"> 
         <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
         <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
        </div> 
       </div> 
      </div> </li> 
     <li> 
      <div>
        성질별세출총괄(공기업) 
       <div class="file_btn"> 
        <i class="vertical_line"></i> 
        <div class="down_view" depth="15"> 
         <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
         <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
        </div> 
       </div> 
      </div> </li> 
     <li> 
      <div>
        성질별세출총괄(기타) 
       <div class="file_btn"> 
        <i class="vertical_line"></i> 
        <div class="down_view" depth="16"> 
         <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
         <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
        </div> 
       </div> 
      </div> </li> 
    </ul> 
   </div> </li> 
  <li> 
   <div class="file_wrap"> 
    <div class="file_title">
     VIII 일반회계
    </div> 
   </div> 
   <div class="file_detail_list"> 
    <ul class="file_exist clearfix align_count3"> 
     <li> 
      <div>
        세입예산서 
       <div class="file_btn"> 
        <i class="vertical_line"></i> 
        <div class="down_view" depth="17"> 
         <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
         <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
        </div> 
       </div> 
      </div> </li> 
     <li> 
      <div>
        세입예산사업명세서 
       <div class="file_btn"> 
        <i class="vertical_line"></i> 
        <div class="down_view" depth="18"> 
         <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
         <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
        </div> 
       </div> 
      </div> </li> 
     <li> 
      <div>
        세출예산서 
       <div class="file_btn"> 
        <i class="vertical_line"></i> 
        <div class="down_view" depth="19"> 
         <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
         <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
        </div> 
       </div> 
      </div> </li> 
     <li class="w100p"> 
      <div class="overlap"> 
       <span class="margin_l_15">세출예산 사업명세서</span> 
       <ul class="file_exist clearfix align_count3"> 
        <li> 
         <div>
           행정국 
          <div class="file_btn"> 
           <i class="vertical_line"></i> 
           <div class="down_view" depth="20"> 
            <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
            <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
           </div> 
          </div> 
         </div> </li> 
        <li> 
         <div>
           산업경제국 
          <div class="file_btn"> 
           <i class="vertical_line"></i> 
           <div class="down_view" depth="21"> 
            <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
            <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
           </div> 
          </div> 
         </div> </li> 
        <li> 
         <div>
           문화관광국 
          <div class="file_btn"> 
           <i class="vertical_line"></i> 
           <div class="down_view" depth="22"> 
            <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
            <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
           </div> 
          </div> 
         </div> </li> 
        <li> 
         <div>
           복지환경국 
          <div class="file_btn"> 
           <i class="vertical_line"></i> 
           <div class="down_view" depth="23"> 
            <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
            <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
           </div> 
          </div> 
         </div> </li> 
        <li> 
         <div>
           올림픽도시정비단 
          <div class="file_btn"> 
           <i class="vertical_line"></i> 
           <div class="down_view" depth="24"> 
            <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
            <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
           </div> 
          </div> 
         </div> </li> 
        <li> 
         <div>
           건설수도본부 
          <div class="file_btn"> 
           <i class="vertical_line"></i> 
           <div class="down_view" depth="25"> 
            <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
            <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
           </div> 
          </div> 
         </div> </li> 
       </ul> 
      </div> </li> 
    </ul> 
   </div> </li> 
  <li> 
   <div class="file_wrap"> 
    <div class="file_title">
     IX 공기업특별회계
    </div> 
   </div> 
   <div class="file_detail_list"> 
    <ul class="file_exist clearfix align_count3"> 
     <li> 
      <div>
        계속비사업조서 
       <div class="file_btn"> 
        <i class="vertical_line"></i> 
        <div class="down_view" depth="26"> 
         <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
         <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
        </div> 
       </div> 
      </div> </li> 
     <li> 
      <div>
        공영개발특별회계 
       <div class="file_btn"> 
        <i class="vertical_line"></i> 
        <div class="down_view" depth="27"> 
         <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
         <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
        </div> 
       </div> 
      </div> </li> 
    </ul> 
   </div> </li> 
 </ul> 
</div> 
<div class="box type2"> 
 <div class="inner_box text_center"> 
  <div class="down_view large type2" depth="28"> 
   <span>2016년 강릉시 2회 추경 세입세출 예산서</span> 
   <a href="/DATA/download/www/74/" class="file_down" title="PDF 다운로드">다운로드<i></i></a> 
   <a href="/DATA/download/www/74/" class="file_view" title="PDF 미리보기">미리보기<i></i></a> 
  </div> 
 </div> 
</div>
