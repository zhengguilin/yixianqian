var refer = document.referrer;
var my_domain = document.domain;
var my_domain = my_domain.substr(my_domain.indexOf(".")+1);
if(refer != undefined )
{       
	val = 0;
	if(refer.indexOf('hao123.') >0)
  {       
      val = 3;
  }       
  if(refer.indexOf('265.') >0)
  {       
      val = 4;
  }       
  if(refer.indexOf('3721.') >0)
  {       
      val = 6;
  }       
  if(refer.indexOf('my123.') >0)
  {       
      val = 7;
  }       
  if(refer.indexOf('9991.') >0)
  {       
      val = 8;
  }       
  if(refer.indexOf('sogou.') >0)
  {       
      val = 9;
  }   
	if(refer.indexOf('google.') >0)
  {       
      val = 11;
  }   
  if(refer.indexOf('yahoo.') >0)
  {       
      val = 12;
  }  
  if(refer.indexOf('baidu.') >0)
  {       
      val = 15;
  }
  if(refer.indexOf('p://cn.msn.com') >0)
  {       
      val = 2000;
  }
  if(refer.indexOf('265.com') >0)
  {       
      val = 3000;
  }
  if(refer.indexOf('so.360.cn') >0)
  {       
      val = 360859;
  }
	if(val > 0)
	{       
		var  expire_date=new Date(); 
		var  ms_from_now = 60 * 60 * 1000; 
		expire_date.setTime(expire_date.getTime() + ms_from_now);
		var expire_string = expire_date.toGMTString();
		document.cookie = "REG_ST_ID="+ val +"; expires="+ expire_string+";domain="+my_domain;
		document.cookie = "REG_ST_URL="+ refer +"; expires="+ expire_string+";domain="+my_domain;
	}
	document.cookie = "REG_REF_URL="+ refer +"; expires="+ expire_string+";domain="+my_domain;

}     
