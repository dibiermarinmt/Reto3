var idCarga; // Guarda el Id del elemento cuando se da click en el botón cargar



function editar(){

    var elemento={
        idReservation: idCarga,
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
        doctor:{"id":$("#doctor").val()},
        client:{"idClient":$("#client").val()}
    };
   
   
    var dataToSend=JSON.stringify(elemento);
    $.ajax({    

        dataType : 'JSON',
       
        data: dataToSend,
        
        url: 'http://localhost:8080/api/Reservation/update',
        
        type: 'PUT',
        contentType:'application/json',
        
        
        success : function(json, textStatus, xhr) {
         
                console.log(json);
        },
        
        
        complete : function(xhr, status) {
            //alert('Petición realizada '+xhr.status);
            limpiarFormulario();
            consultar();
            idCarga=null;
        }
    });
}

function eliminar(idElemento){
    var elemento={
        "id":idElemento
      };
      console.log("mirar id de elemento"+ idElemento);
      
      var dataToSend=JSON.stringify(elemento);
    $.ajax({    
        
        dataType : 'JSON',
       
        data : dataToSend,
        
       
        url : "http://localhost:8080/api/Reservation/"+idElemento,
        type: 'DELETE',
        contentType:'application/json',
        success : function(json, textStatus, xhr) {
          
                console.log(idElemento);
                
        },
        
        complete : function(xhr, status) {
           //lert('Petición realizada '+xhr.status);
            //limpiarFormulario();
            consultar();
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
          idCarga = idItem;
          console.log("idCarga es " +idCarga);
  
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
       catch(error){
            myTable+="<td>"+"Sin calificacion"+"</td>";
       }
       
        myTable+="<td><button onclick='eliminar("+respuesta[i].idReservation+")'>Borrar</button></td>";

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
        client:{"idClient":window.client}        
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

function consultarDatos(){

    consultarDoctor();
    consultarCliente();

}

// funciones combo box Doctor 1(consulta) 2(llenado Option) 3(declaracion variable global Doctor)

 function consultarDoctor(){
    $.ajax({
        url:"http://localhost:8080/api/Doctor/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
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

    function fillBook(document){    
        var first_select = document.getElementById('Doctores').value;
        
        console.log('Doctor select -> '+first_select);
        window.doctor=first_select; 
     }

//// funciones combo box Client 1(consulta) 2(llenado Option) 3(declaracion variable global Doctor)

function consultarCliente(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            comboBoxCliente(respuesta);

        }
    });
}
    function comboBoxCliente(respuesta){
        let myOption="<select name=Clientes id=Clientes>";
                myOption+="<option value="+0+">"+"Seleccione Cliente"+"</option>";
            for(i=0; i<respuesta.length; i++) {
                myOption+="<option value="+respuesta[i].idClient+">"+respuesta[i].name+"</option>";

}
        myOption+="</select>";
        $("#comboClient").html(myOption);
        
    }

    function fillBookCliente(document){    
        var first_select = document.getElementById('Clientes').value;
        
        console.log('Client select -> '+first_select);
        window.client=first_select; 
     }



