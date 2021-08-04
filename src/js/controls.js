// JavaScript Document

function solonumeros(e)
{
	key=e.keyCode || e.which;
	teclado=String.fromCharCode(key);
	numeros="0123456789";
	especiales="8-37-38-46";
	teclado_especial=false;
	for(var i in especiales)
	{
		if(key==especiales[i])
		{
			teclado_especial=true;
		}
	}
	if (numeros.indexOf(teclado)==-1 && !teclado_especial){
		return false;
	}
}

function sololetras(e)
{
	key=e.keyCode || e.which;
	teclado=String.fromCharCode(key);
	letras="abcdefghijklmnñopqrstuvwxyz  /^[a-zA-Z]*$/";
	letras_mayusc="ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
	especiales="8-37-38-46";
	teclado_especial=false;
	for(var i in especiales)
	{
		if(key==especiales[i])
		{
			teclado_especial=true;
		}
	}
	if (letras.indexOf(teclado)==-1 && letras_mayusc.indexOf(teclado)==-1 && !teclado_especial)
	{
		return false;
	}
}

function sololetrasM(e)
{
	key=e.keyCode || e.which;
	teclado=String.fromCharCode(key);
	numeros="1234567890";
	letras_mayusc="ABCDEFGHIJKLMNÑOPQRSTUVWXYZ /^[AZ]*$/";
	especiales="8-37-38-46";
	teclado_especial=false;
	for(var i in especiales)
	{
		if(key==especiales[i])
		{
			teclado_especial=true;
		}
	}
	if (letras_mayusc.indexOf(teclado)==-1 && numeros.indexOf(teclado)==-1 && !teclado_especial)
	{
		return false;
	}
}

function validardireccion(e)
{
	 key=e.keyCode || e.which;
	teclado=String.fromCharCode(key);
	letrasnum="/^[a-zA-Z\s0-9]*$/"
	especiales="8-37-38-46";
	teclado_especial=false;
	for(var i in especiales)
	{
		if(key==especiales[i])
		{
			teclado_especial=true;
		}
	}
	if (letrasnum.indexOf(teclado)==-1 && !teclado_especial)
	{
		return false;
	}
}

function validartelefono(e)
{
	fono=document.getElementById("tlfUser").value;
	if(!(/^\d{9}$/.test(fono)))
	{
		return false;
	}
}	

function validarCedula(elemento){
       //Preguntamos si la cedula consta de 10 digitos
       var cedula=elemento.value
     if(cedula.length == 10){
        
        //Obtenemos el digito de la region que sonlos dos primeros digitos
        var digito_region = cedula.substring(0,2);
        
        //Pregunto si la region existe ecuador se divide en 24 regiones
        if( digito_region >= 1 && digito_region <=24 ){
          
          // Extraigo el ultimo digito
          var ultimo_digito   = cedula.substring(9,10);
 
          //Agrupo todos los pares y los sumo
          var pares = parseInt(cedula.substring(1,2)) + parseInt(cedula.substring(3,4)) + parseInt(cedula.substring(5,6)) + parseInt(cedula.substring(7,8));
 
          //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
          var numero1 = cedula.substring(0,1);
          var numero1 = (numero1 * 2);
          if( numero1 > 9 ){ var numero1 = (numero1 - 9); }
 
          var numero3 = cedula.substring(2,3);
          var numero3 = (numero3 * 2);
          if( numero3 > 9 ){ var numero3 = (numero3 - 9); }
 
          var numero5 = cedula.substring(4,5);
          var numero5 = (numero5 * 2);
          if( numero5 > 9 ){ var numero5 = (numero5 - 9); }
 
          var numero7 = cedula.substring(6,7);
          var numero7 = (numero7 * 2);
          if( numero7 > 9 ){ var numero7 = (numero7 - 9); }
 
          var numero9 = cedula.substring(8,9);
          var numero9 = (numero9 * 2);
          if( numero9 > 9 ){ var numero9 = (numero9 - 9); }
 
          var impares = numero1 + numero3 + numero5 + numero7 + numero9;
 
          //Suma total
          var suma_total = (pares + impares);
 
          //extraemos el primero digito
          var primer_digito_suma = String(suma_total).substring(0,1);
 
          //Obtenemos la decena inmediata
          var decena = (parseInt(primer_digito_suma) + 1)  * 10;
 
          //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
          var digito_validador = decena - suma_total;
 
          //Si el digito validador es = a 10 toma el valor de 0
          if(digito_validador == 10)
            var digito_validador = 0;
 
          //Validamos que el digito validador sea igual al de la cedula
          if(digito_validador == ultimo_digito){
            elemento.className='';
          }else{
            elemento.className='error';
          }
          
        }else{
          // imprimimos en consola si la region no pertenece
          elemento.className='error';
        }
     }else{
        //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
        elemento.className='error';
     }    
    
}

function edad(elemento)
{
		
}

function entroEnFoco(elemento) 
{
	elemento.className='enfoco';
}