<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%
String language = request.getParameter("language") == null? "ko_KR":request.getParameter("language");
String selector = request.getParameter("selector") == null? "textarea":request.getParameter("selector");
String imageUpload = request.getParameter("imageUpload") == null? "N": "IU".equals(request.getParameter("imageUpload")) ? "Y":"N";
request.setAttribute("language", language);
request.setAttribute("selector", selector);
request.setAttribute("imageUpload", imageUpload);
%>
<script src="/common/tinymce/js/tinymce/tinymce.min.js"></script>
<script>
//<![CDATA[
tinymce.init({
	language:'${language}',
	selector:'${selector}',
	height:300,
	forced_root_block: false, force_br_newlines: true, force_p_newlines: false, menubar:false, statusbar:false,
	plugins: 'autolink link image anchor code',
	toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code',
	relative_urls: false
	<c:if test="${'Y' eq imageUpload}">
    ,image_title: false,
	automatic_uploads: true,
	images_upload_url: '/common/photoUpload.do',
	file_picker_types: 'image',
	file_picker_callback: function(cb, value, meta) {
	    var input = document.createElement('input');
	    input.setAttribute('type', 'file');
	    input.setAttribute('accept', 'image/*');

	    input.onchange = function() {
			var file = this.files[0];

			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function () {
				// Note: Now we need to register the blob in TinyMCEs image blob
				// registry. In the next release this part hopefully won't be
				// necessary, as we are looking to handle it internally.
				var id = 'blobid' + (new Date()).getTime();
				var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
				var base64 = reader.result.split(',')[1];
				var blobInfo = blobCache.create(id, file, base64);
				blobCache.add(blobInfo);

				// call the callback and populate the Title field with the file name
				cb(blobInfo.blobUri(), { title: file.name });
			};
	    };
	    input.click();
	}
	</c:if>
})
//]]>
</script>