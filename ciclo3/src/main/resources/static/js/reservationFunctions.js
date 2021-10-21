function editar(idElemento,speElemento,graduaElemento,depaElemento,nameElemento){
    idElemento=$("#id").val(),
    speElemento= $("#specialty").val(),
    graduaElemento= $("#graduate_year").val(),
    depaElemento= $("#department_id").val(),
    nameElemento= $("#name").val()

    var elemento={
        id:idElemento,
        specialty:speElemento,
        graduate_year:graduaElemento,
        department_id:depaElemento,
        name:nameElemento
    };
    
    var dataToSend=JSON.stringify(elemento);
    $.ajax({    

        dataType : 'json',
       
        data : dataToSend,
        
        url : 'https://ga9c9b6eca3f530-db202109271959.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/doctor/doctor',
        
        type: 'PUT',
        contentType:'application/json',
        
        
        success : function(json, textStatus, xhr) {
         
                console.log(json);
        },
        
        
        complete : function(xhr, status) {
            alert('Petición realizada '+xhr.status);
            limpiarFormulario();
        }
    });
}

function eliminar(idElemento){
    var elemento={
        id:idElemento
      };
      
      
      var dataToSend=JSON.stringify(elemento);
    $.ajax({    
        
        dataType : 'json',
       
        data : dataToSend,
        
       
        url : 'https://ga9c9b6eca3f530-db202109271959.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/doctor/doctor',
        type: 'DELETE',
        contentType:'application/json',
        success : function(json, textStatus, xhr) {
          
                console.log(idElemento);
        },
        
        complete : function(xhr, status) {
            alert('Petición realizada '+xhr.status);
            limpiarFormulario();
        }
    });
}

function buscarPorID(idItem){

    var id = idItem 
    $.ajax({    
        url : 'https://ga9c9b6eca3f530-db202109271959.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/doctor/doctor/'+id.val(),
        type : 'GET',
        dataType : 'json',        

        success : function(json) {
                $("#resultados").empty();
               
                console.log(json.items[0].id +" $"+json.items[0].name);
                console.log("no se puedo ")

                var misItems=json.items;
                    
                
                 
                  $("#resultados").append("<tr>");
                  $("#resultados").append("<td>"+misItems[0].id+" || "+ "</td>");
                  $("#resultados").append("<td>"+misItems[0].specialty+" || "+"</td>");
                  $("#resultados").append("<td>"+misItems[0].graduate_year+" || "+"</td>");
                  $("#resultados").append("<td>"+misItems[0].department_id+" || "+"</td>");
                  $("#resultados").append("<td>"+misItems[0].name+" || "+"</td>");
                  $("#resultados").append('<td><button onclick="eliminar('+misItems[0].id+')">Borrar</button></td>');
                  $("#resultados").append('<td><button onclick="obtenerItemEspecifico('+misItems[0].id+')">Cargar</button></td>');
                  $("#resultados").append("</tr>");
        
                

        },
        
        complete : function(xhr, status) {
            alert('Petición realizada '+xhr.status);
        }
    });
}


function cargar(idItem){
    $.ajax({    
        url : "http://localhost:8080/api/Reservation/"+idItem,
        type : 'GET',
        dataType : 'JSON',        

        success : function(json) {               
                console.log(json);
  
          $("#startDate").val(json.startDate);
          $("#devolutionDate").val(json.devolutionDate);
          $("#status").val(json.status);
          $("#doctor").val(json.doctor.id);
          $("#client").val(json.client.idClient);
          $("#score").val(json.score.idScore);
  
        }
    });
}

//////------------------


function consultar(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta){
    let myTable="<table border=1>";

    myTable+="<thead>";
    myTable+="<TR>";
    myTable+="<th>"+"Id Reserva"+"</th>";
    myTable+="<th>"+"Nombre Doctor"+"</th>";
    myTable+="<th>"+"Id Cliente"+"</th>";
    myTable+="<th>"+"Nombre Cliente"+"</th>";
    myTable+="<th>"+"Email Cliente"+"</th>";
    myTable+="<th>"+"Score"+"</th>";
    myTable+="</TR>";
    myTable+="</thead>";

    for(i=0; i<respuesta.length; i++) {
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].idReservation+"</td>";
        myTable+="<td>"+respuesta[i].doctor.name+"</td>";
        myTable+="<td>"+respuesta[i].client.idClient+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].client.email+"</td>";
       

       try{
            myTable+="<td>"+respuesta[i].score.score+"</td>";
       }
       catch 
       {
            myTable+="<td>"+"Sin calificacion"+"</td>";
       }
       
        myTable+="<td><button onclick='borrar("+respuesta[i].idReservation+")'>Borrar</button></td>";
        myTable+="<td><button onclick='cargar("+respuesta[i].idReservation+")'>Cargar</button></td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultados").html(myTable);
}

function guardar(){
    let var2 = {
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        doctor:{"id":window.doctor},
        client:{"idClient":$("#client").val()}        
    };
    console.log(var2);
    $.ajax({
        type:'POST',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://localhost:8080/api/Reservation/save",
        success:function(respose) {
            console.log("Se guardó correctamente");
            //alert("Se guardó correctametne..");
            //window.location.reload();
            limpiarFormulario();
            consultar();
        },
        error:function(jqXHR, textStatus, errorTrown){
            window.location.reload();
            console.log("No se guardó");
            alert("No se guardó correctamente");
        }
    });
}

function limpiarFormulario(){
    $("#startDate").val("");
    $("#devolutionDate").val("");
    $("#status").val("created");
    $("#doctor").val("");
    $("#client").val("");
    $("#score").val("");
}

function fillBook(document){    
    var first_select = document.getElementById('Doctores').value;
    
    console.log('Primer select -> '+first_select);
    window.doctor=first_select; 
 }

 function consultarDoctor(){
    $.ajax({
        url:"http://localhost:8080/api/Doctor/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta[0].name);
            console.log(respuesta[1].name);
            comboBoxDoctor(respuesta);
        }
    });
}
    function comboBoxDoctor(respuesta){
        let myOption="<select name= Doctores id=Doctores>";
                myOption+="<option value="+0+">"+"Seleccione Doctor"+"</option>"
            for(i=0; i<respuesta.length; i++) {
                myOption+="<option value="+respuesta[i].id+">"+respuesta[i].name+"</option>"




}
        myOption+="</select>";
        $("#comboDoctor").html(myOption);
        
        
    }