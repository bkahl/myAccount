function myAccount(id,data){
  
  var div, tr;
  
  $(id).removeClass('none');
  
  if(data.type === "director" || data.type === "rep"){
      div = "<div class='inner-table-title'>"+data.title+"</div>";
      div += "<div class='inner-table-content'>";
        div += "<table>";
          div += "<tbody>";
            div += "<tr>";
              div += "<td class='name'>"+data.info.name+"</td>";
            div += "</tr>";
            div += "<tr>";
              div += "<td class='phone'>"+data.info.phone+"</td>";
            div += "</tr>";
            div += "<tr>";
              div += "<td class='email'><a href='mailto:"+data.info.email+"'/a>"+data.info.email+"</td>";
            div += "</tr>";
          div += "</tbody>";
        div += "</table>";
      div += "</div>";
    
    $(id).append(div);
  }else if(data.type === "contacts"){
    div = "<div class='inner-table-title'>"+data.title+"</div>";
    div += "<div class='inner-table-content'>";
      div += "<table width='365'>";
        div += "<tbody>";
          div += "<tr>";
            div += "<td class='name' align='left' style='padding-top:4px'>Product:</td>";
            div += "<td align='right' style='padding-top:4px'>"+data.baseProductsAndContactsInfo.product+"</td>";
          div += "</tr>";
          div += "<tr>";
            div += "<td class='name' align='left' style='padding-top:4px'>Number of Contacts:</td>";
            div += "<td align='right' style='padding-top:4px'>"+data.baseProductsAndContactsInfo.contacts+"</td>";
          div += "</tr>";
          div += "<tr>";
            div += "<td class='name' align='left' style='padding-top:4px'>Renewal Date:</td>";
            div += "<td align='right' style='padding-top:4px'>"+data.baseProductsAndContactsInfo.renewalDate+"</td>";
          div += "</tr>";
        div += "</tbody>";
      div += "</table>";
    div += "</div>";
    
    $(id).append(div);
  }else if(data.type === "products"){
    div = "<div class='inner-table-title'>"+data.title+"</div>";
    div += "<div class='inner-table-content'>";
      div += "<table width='365'>";
        div += "<tbody>";
          div += "<tr>";
            div += "<td width='165' class='name' align='left'>Product</td>";
            div += "<td width='100' class='name' align='left'>Licenses</td>";
            div += "<td width='100' class='name' align='left'>Renewal Date</td>";
          div += "</tr>";
          
          data.addOnProducts.forEach(function(o){
            div += "<tr>";
              div += "<td width='165' align='left' style='padding-top:4px'>"+o.product+"</td>";
              div += "<td width='100' align='left' style='padding-top:4px'>"+o.licenses+"</td>";
              div += "<td width='100' align='left' style='padding-top:4px'>"+o.renewalDate+"</td>";
            div += "</tr>";
          });
          
        div += "</tbody>";
      div += "</table>";
    div += "</div>";

    $(id).append(div);
  }
  
}

(function($){
	$.fn.myAccount = function(options){
		var id	= $(this), opts;

    if(options.type === "director"){
  		$.fn.myAccount.defaults = {
  		  type: 'director',
  		  title: 'Account Director'
  		};
  	}else if(options.type === "rep"){
  	  $.fn.myAccount.defaults = {
  	    type: 'rep',
  	    title: 'Premier Rep'
  		};
  	}else if(options.type === "contacts"){
  	  $.fn.myAccount.defaults = {
  	    type: 'contacts',
  	    title: 'Base Product and Contacts'
  		};
  	}else if(options.type === "products"){
  	  $.fn.myAccount.defaults = {
  	    type: 'products',
  	    title: 'Add-On Products'
  		};
  	}
		
		opts = $.extend({}, $.fn.myAccount.defaults, options);
		
    myAccount(id, opts);
    
		return this;	
	};

})(jQuery);