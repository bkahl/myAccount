function isEven(value){
  if (value%2 === 0) return true;
  else return false;
}

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
      div += "<div class='row'>";
        div += "<div id='row1Title' class='rowTitle'>Product:</div>";
        div += "<div id='row1Dots' class='rowDots'>...............................................................................................</div>";
        div += "<div id='row1Value' class='rowValue'>"+data.baseProductsAndContactsInfo.product+"</div>";
      div += "</div>";
      div += "<div class='row'>";
        div += "<div id='row2Title' class='rowTitle'>Number of Contacts:</div>";
        div += "<div id='row2Dots' class='rowDots'>...............................................................................................</div>";
        div += "<div id='row2Value' class='rowValue'>"+data.baseProductsAndContactsInfo.contacts+"</div>";
      div += "</div>";
      div += "<div class='row'>";
        div += "<div id='row3Title' class='rowTitle'>Renewal Date:</div>";
        div += "<div id='row3Dots' class='rowDots'>...............................................................................................</div>";
        div += "<div id='row3Value' class='rowValue'>"+data.baseProductsAndContactsInfo.renewalDate+"</div>";
      div += "</div>";
    div += "</div>";
    
    $(id).append(div);
  }else if(data.type === "products"){
    var count = 0, evenOdd;
    
    div = "<div class='inner-table-title'>"+data.title+"</div>";
    div += "<div class='inner-table-content'>";
      div += "<table width='375'>";
        div += "<tbody>";
          div += "<tr height='20' style='line-height: 20px;'>";
            div += "<th width='165' class='name' style='padding-left: 6px;' align='left'>Product</td>";
            div += "<th width='100' class='name' align='left'>Licenses</td>";
            div += "<th width='100' class='name' align='left'>Renewal Date</td>";
          div += "</tr>";         

          data.addOnProducts.forEach(function(o){
            evenOdd = isEven(count);
            
            if(evenOdd) div += "<tr height='20' style='line-height: 20px;'>";
            else div += "<tr class='odd' height='20' style='line-height: 20px;'>";
              div += "<td width='165' align='left'style='padding-left: 6px;'>"+o.product+"</td>";
              div += "<td width='100' align='left'>"+o.licenses+"</td>";
              div += "<td width='100' align='left'>"+o.renewalDate+"</td>";
            div += "</tr>";
            count++;
          });
          
        div += "</tbody>";
      div += "</table>";
    div += "</div>";

    $(id).append(div);
  }
}

function calcTableSize(rt, rd, rv){
  var rowWidth = 365, rowTotal = 15, rowDotsWidth = 0;
  
  var rowTitle = document.getElementById(rt),
      rowTitleWidth = rowTitle.clientWidth;
  $(rowTitle).css('width',rowTitleWidth);
  rowTotal += rowTitleWidth;
  
  var rowValue = document.getElementById(rv),
      rowValueWidth = rowValue.clientWidth;
  $(rowValue).css('width',rowValueWidth);
  rowTotal += rowValueWidth;
  
  rowDotsWidth = (rowWidth-rowTotal);    
  $('#'+rd).css('width',rowDotsWidth); 
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
    
    if (options.type === "contacts"){
      calcTableSize('row1Title','row1Dots','row1Value');
      calcTableSize('row2Title','row2Dots','row2Value');
      calcTableSize('row3Title','row3Dots','row3Value');
    }
    
		return this;	
	};

})(jQuery);