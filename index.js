let star,path_true="images/star-icon-true.png",path_false="images/star-icon-false.png";
function fnBtn(clicked_id){
    star=$.cookie(clicked_id)
    if(star==path_true){star=path_false;}
    else{star=path_true;}
    $("#"+clicked_id).attr("src",star);
    $.cookie(clicked_id,star);
}
const autho = "CWB-06104A48-5860-46FD-AF14-19BEE7C23B2F"
$(document).ready(function(){
    $.ajax({
        url: "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=" + autho + "&format=JSON",
        type: 'get',
        success: function (response) {
            const location=response.records.location;
            let locationName,Wx=[],PoP=[],MinT=[],MaxT=[],CI=[],startTime=[],endTime=[],favorite=0;

            $.each(location, function(index0,cityFile){
                locationName=cityFile.locationName;
                
                if($.cookie("submit_Btn_"+locationName)==undefined || $.cookie("submit_Btn_"+locationName)==null){
                    $.cookie("submit_Btn_"+locationName,path_false,
                    {
                        expires:7,
                        path : '/',
                        secure : true                    
                    });
                }
                star=$.cookie("submit_Btn_"+locationName);  
                
                
                if(index0<=10){
                    $("#nav1").append("<li><a data-toggle='tab' href=#"+locationName+" class = 'nav-link'>"+cityFile.locationName+"</a></li>"); 
                }
                else{
                    $("#nav2").append("<li><a data-toggle='tab' href=#"+locationName+" class = 'nav-link' >"+cityFile.locationName+"</a></li>"); 
                }

                
                $("#nav_content").append("<div class='container tab-pane fade 'id="+locationName+"><br></div>");            
                $("#"+locationName).append("<img src='images/"+locationName+".png' alt='img_error' </img><div><br></div>")
                $("#"+locationName).append("<table class='table table-hover table-active' id ='table_"+locationName+"'></table>")
                $("#table_"+locationName).append("<thead><tr id='col_"+locationName+"'></tr></thead>")
                $("#col_"+locationName).append("<th scope='col'>"+locationName+
                                                "<input  type='image'  name='submit_Btn'  id='submit_Btn_"+locationName+"'  img src='"+star+
                                                "' width='24' align='center' onclick='fnBtn(this.id)'>"+
                                                "</th><th scope='col'>天氣現象</th><th scope='col'>降雨機率</th><th scope='col'>溫度</th><th scope='col'>舒適度</th>")
               
                $.each(cityFile.weatherElement, function(index1,cityWeather){
                    $.each(cityWeather.time, function(index2,weather){
                        switch(index1){
                            case 0:
                                Wx.push(weather.parameter.parameterName)
                                break;
                            case 1:
                                PoP.push(weather.parameter.parameterName)
                                break;
                            case 2:
                                MinT.push(weather.parameter.parameterName)
                                break;
                            case 3:
                                CI.push(weather.parameter.parameterName)
                                break;
                            case 4:
                                MaxT.push(weather.parameter.parameterName)
                                startTime.push(weather.startTime)
                                endTime.push(weather.endTime)
                                break;
                        }
                    });
                });
               
                $("#table_"+locationName).append("<tbody id='tbody_"+locationName+"'></tbody>")
                for(var k=0;k<3;k++){
                    $("#tbody_"+locationName).append("<tr id = 'row_"+locationName+k+"'><th scope='row'>"+startTime.shift()+"<br>至<br>"+endTime.shift()+"</th></tr>")
                    for(var j=0;j<4;j++){
                        switch(j){
                            case 0:
                                $("#row_"+locationName+k).append("<th><br>"+Wx.shift()+"</th>")
                                break;
                            case 1:
                                $("#row_"+locationName+k).append("<th><br>"+PoP.shift()+" %"+"</th>")
                                break;
                            case 2:
                                $("#row_"+locationName+k).append("<th><br>"+MinT.shift()+ ~ +MaxT.shift()+" °C"+"</th>")
                                break;
                            case 3:
                                $("#row_"+locationName+k).append("<th><br>"+CI.shift()+"</th>")
                                break;
                        }
                    }
                }
                if(star==path_true){
                    $("#"+locationName).addClass("active show");
                    favorite=1;
                }
            });
            if(favorite==0){
                $("#嘉義縣").addClass("active show");
            }

        }
    }); 
});