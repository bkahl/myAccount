var d = false, r = false, c = false, p = false, 
    date = new Date(), 
    curr_month = date.getMonth() + 1,
    curr_date = date.getDate(),
    curr_year = date.getFullYear();

function isEven(value){
  if (value%2 === 0) return true;
  else return false;
}

function calcTableSize(rt, rd, rv){
  var rowWidth = 365, rowTotal = 15, rowDotsWidth = 0;
  
  var rowTitle = document.getElementById(rt),
      rowTitleWidth = (rowTitle.clientWidth+1);
  $(rowTitle).css('width',rowTitleWidth);
  rowTotal += rowTitleWidth;
  
  var rowValue = document.getElementById(rv),
      rowValueWidth = rowValue.clientWidth;
  $(rowValue).css('width',rowValueWidth);
  rowTotal += rowValueWidth;
  
  rowDotsWidth = (rowWidth-rowTotal);    
  $('#'+rd).css('width',rowDotsWidth); 
}

function renewalDate(id,v){
 var m, d, y, difBetweenMonths, difBetweenDays;
 
 m = v.split('/')[0];
 d = v.split('/')[1];
 y = v.split('/')[2];

 difBetweenMonths = m-curr_month;
 difBetweenDays = d - curr_date;
 
 if(y = curr_year){
   if(difBetweenMonths > 3){
     $(id).css('color','#719037');
   } 
   else if(difBetweenMonths <= 3 && difBetweenMonths >= 2){
     $(id).css('color','#e48f15');
   } 
   else if(difBetweenMonths === 1){
     $(id).css('color','#c82223');
   } 
   else if(difBetweenMonths === 0){
     if(difBetweenDays > 10) {
        $(id).css('color','#c82223');
       }
     else if(difBetweenDays <= 10) {
       $(id).css('color','#c82223').css('font-weight','bold');
     }
   } 
 }
 
}

function myAccount(id,data){
  
  var div, tr, count = 0, total;
  
  $(id).removeClass('none');
  
  if(data.type === "director" || data.type === "rep"){
      if(data.type === "director") d += true;
      else r += true;

      div = "<div class='inner-table-title'>"+data.title+"</div>";
      div += "<div class='inner-table-content'>";
        div += "<table>";
          div += "<tbody>";
            div += "<tr>";
              div += "<td class='name' style='padding-top: 2px;'>"+data.info.name+"</td>";
            div += "</tr>";
            div += "<tr>";
              div += "<td class='phone' style='padding-top: 4px;'>"+data.info.phone+"</td>";
            div += "</tr>";
            div += "<tr>";
              div += "<td class='email' style='padding-top: 4px;'><a href='mailto:"+data.info.email+"'/a>"+data.info.email+"</td>";
            div += "</tr>";
          div += "</tbody>";
        div += "</table>";
      div += "</div>";
      
    $(id).append(div);
  }else if(data.type === "contacts"){
    c += true;
    
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
    
    renewalDate('#row3Value',data.baseProductsAndContactsInfo.renewalDate);
  }else if(data.type === "products"){
    p += true;
    var evenOdd;

    div = "<div class='inner-table-title'>"+data.title+"</div>";
    div += "<div id='products-header' class='inner-table-content'>";
      div += "<table width='375'>";
        div += "<tbody>";
          div += "<tr height='20' style='line-height: 20px;'>";
            div += "<th width='165' class='name' style='padding-left: 6px;' align='left'>Product</td>";
            div += "<th width='100' class='name' align='left'>Licenses</td>";
            div += "<th width='100' class='name' align='left'>Renewal Date</td>";
          div += "</tr>"; 
        div += "</tbody>";       
      div += "</table>";
    div += "</div>";
    
    div += "<div id='products-content' class='inner-table-content'>";
      div += "<table width='375'>";
        div += "<tbody>";
          
          data.addOnProducts.forEach(function(o){
            var evenOdd = isEven(count);
            
            if(evenOdd) div += "<tr height='20' style='line-height: 20px;'>";
            else div += "<tr class='odd' height='20' style='line-height: 20px;'>";
              div += "<td width='165' align='left'style='padding-left: 6px;'>"+o.product+"</td>";
              div += "<td width='100' align='left'>"+o.licenses+"</td>";
              div += "<td width='100' align='left' id='products-renewalDate"+[count]+"'>"+o.renewalDate+"</td>";
            div += "</tr>";
            count++;
          });
          
        div += "</tbody>";
      div += "</table>";
    div += "</div>";
    
    $(id).append(div);
    
    var z = 0;
    data.addOnProducts.forEach(function(o){
      renewalDate('#products-renewalDate'+[z],o.renewalDate);
      z++;
    });
  }
  
  if(count > 5) {
    $('.products > #products-header .inner-table-content').css('padding','none !important');
    $('.products > #products-content').css('height','101').css('overflow-y','auto').css('overflow-x','hidden').css('padding-bottom','7');
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
    
    if(d) {
      if(r) $('.director').css('width','175');
      if(!r) $('.director').css('width','100%');
    }else if(r) {
      if(d) $('.rep').css('width','175'); $('.rep').css('width','175');
      if(!d) $('.rep').css('width','100%');
    }
    
    if (options.type === "contacts"){
      calcTableSize('row1Title','row1Dots','row1Value');
      calcTableSize('row2Title','row2Dots','row2Value');
      calcTableSize('row3Title','row3Dots','row3Value');
    }

		return this;	
	};

})(jQuery);