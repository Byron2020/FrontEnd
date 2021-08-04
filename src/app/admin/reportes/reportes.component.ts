import { Component, Input, OnInit, Output } from '@angular/core';
import { LibDiario } from 'src/app/modelos/lib-diario';
import { ApiService } from 'src/app/servicios/api.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { rendererTypeName } from '@angular/compiler';
import { style } from '@angular/animations';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  @Input() lib: any = [];
  ast: any = [];
  @Input() trans: any = [];

  Libros: LibDiario[];
  searchValue: any;
  p: number = 1;

  constructor(private service: ApiService) { }

  ModalTitle: string;
  ActivatedAddEditLibComp: boolean = false;

  ActivatedAsientos: boolean = false;

  ActivarLibDiario: boolean = false;
  ActivarbtnPDF: boolean = false;


  id_libdiario: string;
  fechini_libdiario: string;
  fechfin_libdiario: string;

  id_asientos: string;
  fech_asientos: string;
  obse_asientos: string;

  id_transaccion: string;
  deta_transaccion: string;
  parc_transaccion: number;
  debe_transaccion: number;
  habe_transaccion: number;

  LibrosList: any = [];
  AsientosList: any = [];
  TransaccionesList: any = [];


  ActivarReporLib: boolean = false;
  AdminTitle: string;
  dato_select: string = "";

  ngOnInit(): void {
    this.AdminTitle = "Reportes";
    this.refreshLibrosList();
  }


  getFor(item) {
    var cont = 1;
    var log = [];

    item.forEach(function (value, index) {
      console.log("desde For");
      console.log(value);
      log[index] = value.id_asientos;
    });

    for (let i = 0; i < item.length; i++) {
      console.log("valores del FOr");
      console.log(item[i].id_asientos);
      /* console.log(this.detalleTransaccionesClick(item[i].id_asientos)); */
    }

    var numbers = [2, 4, 6, 8];
    item.forEach(arrayFunction);

    function arrayFunction(element, index, array) {

      console.log("arr[" + index + "]=" + element.id_asientos);

      log[index] = element.id_asientos;

    }
    console.log("calores del Log");
    console.log(log);

  }
  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0); //Posicion de la imgane
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }

  async showPdf() {

    let docDefinition = {

      header: {
        rowSpan: 3,
        margin: [20, 20],
        widths: ['*', '*', 'auto'],
        columns: [

          {

            // auto-sized columns have their widths based on their content
            image: await this.getBase64ImageFromURL(
              "assets/img/app/espoch-sello.png"
            ),


          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally

            text: 'Second column',
            border: [true, true, false, false]
          },
          {
            // fixed width

            image: await this.getBase64ImageFromURL(
              "assets/img/app/espoch-sello.png"
            ),
          }
        ],
        // optional space between columns


      },

      footer: {
        columns: [
          'Left part',
          { text: 'Right part', alignment: 'right' }
        ]
      },
      content: [
        {
          text: 'ESPOCH', margin: [45, 0],
          fontSize: 24
        },
        {

        }
      ]
    };
    pdfMake.createPdf(docDefinition).open();
  }

  async showPdf2() {
    var headers = {
      fila_0: {
        col_1: { text: 'Faltas', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] },
        col_2: { text: 'Fecha', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] },
        col_3: { text: 'Descripción', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] },
        col_4: { text: 'Cita con acudientes', style: 'tableHeader', colSpan: 2, alignment: 'center' }
      },
      fila_1: {
        col_1: { text: 'Header 1', style: 'tableHeader', alignment: 'center' },
        col_2: { text: 'Header 2', style: 'tableHeader', alignment: 'center' },
        col_3: { text: 'Header 3', style: 'tableHeader', alignment: 'center' },
        col_4: { text: 'Citación', style: 'tableHeader', alignment: 'center' },
        col_5: { text: 'Cumplimiento', style: 'tableHeader', alignment: 'center' }
      }
    }
    var rows = this.AsientosList;
    /*     = {
          a: {
            peaje: '1',
            ruta: '2',
            fechaCruce: '3',
            hora: '4',
            valor: '5'
          },
          b: {
            peaje: '1',
            ruta: '2',
            fechaCruce: '4',
            hora: '4',
            valor: '5'
          }
        } */

    /*     var body = [];
        for (var key in headers) {
          if (headers.hasOwnProperty(key)) {
            var header = headers[key];
            var row = new Array();
            row.push(header.col_1);
            row.push(header.col_2);
            row.push(header.col_3);
            row.push(header.col_4);
            row.push(header.col_5);
            body.push(row);
          }
        }
        for (var key in this.TransaccionesList) {
          if (rows.hasOwnProperty(key)) {
            var data = rows[key];
            var row = new Array();
            row.push(data.deta_transaccion);
            row.push(data.valor_transacciona);
            row.push('data.fechaCruce');
            row.push("data.hora.toString()");
            row.push('data.valor.toString()');
            body.push(row);
          }
        }
    var dd = {
          pageMargins: [40,155,40,55],
          pageOrientation: 'landscape',
          header: function() {
              return {
                  margin: 40,
                  columns: [
                    {
                      },
                      { text:['Resumen disciplinario'], 
                              alignment: 'left',bold:true,margin:[-405,80,0,0],fontSize: 24}
                  ]
              }
          },
          footer: function(currentPage, pageCount) {
              return { text:'Pagina '+ currentPage.toString() + ' de ' + pageCount, alignment: 'center',margin:[0,30,0,0] };
          },
          content: [
              //{ text: 'Tables', style: 'header' },
              '\nEl estudiante AGRESOTH NEGRETE JORYETH TATIANA - 901 - TARDE tiene 1 actas, con 1 faltas acomuladas y a manera de resumen descritas a continuación:\n\n',
              //{ text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'sta' },
              //'The following table has nothing more than a body array',
              {
                  style: 'tableExample',
                  table: {
                      widths: [ '*', '*', '*', '*', '*' ],
                      headerRows: 2,
                      // keepWithHeaderRows: 1,
                      body: body
                  }
              }],
          styles: {
              header: {
                  fontSize: 28,
                  bold: true
              },
              subheader: {
                  fontSize: 15,
                  bold: true
              },
              quote: {
                  italics: true
              },
              small: {
                  fontSize: 8
              },
              sta: {
                  fontSize: 11,
                  bold: false,
                  alignment: 'justify'
              }
          }
    } */

    var docDefinition = {

      footer: function (currentPage, pageCount) {
        return [
          {
            text:
              currentPage.toString() +
              " de " +
              pageCount +
              "\n" +
              "", style: 'styleTablasBody',
            alignment: currentPage ? "center" : "center"
          }
        ];
      },
      content: [
        {
          rowSpan: 3,
          widths: ['47', '*', '50'],
          columns: [
            {
              width: 40,
              image: await this.getBase64ImageFromURL(
                "assets/img/app/espoch-sello.png"
              )
            },
            {
              margin: [10, 0],
              text: [

                { text: 'ESPOCH  \n', fontSize: 24, bold: true },
                { text: 'ESCUELA SUPERIOR POLITÉCNICA DE CHIMBORAZO \n\n', fontSize: 12 }
                /*   { text: 'Asociación de Profesores Politécnicos de Chimborazo ', style: 'titulo'}, */

                /* { text: 'ASOCIACIÓN DE PROFESORES POLITÉCNICOS DE CHIMBORAZO', style: 'titulo'} */
              ],
            },
            {
              width: 50,
              image: await this.getBase64ImageFromURL(
                "assets/img/app/appoch.png"
              )
            }
          ],
          //jcdiazo@espoch.edu.ec///
          //jueves tarde  en la noche////

        }, { text: 'ASOCIACIÓN DE PROFESORES POLITÉCNICOS DE CHIMBORAZO', style: 'titulo' },
        , { text: 'LIBRO DIARIO \nDEL ' + this.LibrosList[0].fechini_libdiario + ' AL ' + this.LibrosList[0].fechfin_libdiario + '\n\n', style: 'styleReporAction' },
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            widths: [55, '*', 55, 55, 55],
            headerRows: 1,

            body: [
              [{ text: 'Fecha', style: 'styleTablasHeader' }, { text: 'Detalle', style: 'styleTablasHeader' }, { text: 'Parcial', style: 'styleTablasHeader' }, { text: 'Debe', style: 'styleTablasHeader' }, { text: 'Haber', style: 'styleTablasHeader' }],
              [{
                text: [
                  { text: `${this.AsientosList[0].fech_asientos}`, style: 'styleTablasBody' }]
              }, {
                text: [
                  { text: `${this.TransaccionesList[0].deta_transaccion}`, style: 'styleTablasBody' }]
              }, {
                text: [
                  { text: `${this.TransaccionesList[0].valor_transaccion}`, style: 'styleTablasBody' }]
              }, '0', '0']
            ]
          }
        },

      ],
      styles: {
        titulo: {
          fontSize: 13,
          bold: true,
          //background: '#129149',
          alignment: 'center'
          //color:'#fff'
        },
        styleReporAction: {
          fontSize: 11,
          bold: true,
          alignment: 'center'
        },
        styleTablasHeader: {
          bold: true,
          fontSize: 10,
          italic: true,
          alignment: 'center'
        },
        styleTablasBody: {
          fontSize: 10,
          italic: true,
          alignment: 'center'
        }
      },


    };
    pdfMake.createPdf(docDefinition).open();
  }

  getLibrosAsientos() {
    this.service.getLibDiario(this.lib.id_libdiario).subscribe((data: any) => {
      this.ast = data;
    });
  }
  detalleTransaccionesClick(item) {
    this.service.getTransaccionesId(item).subscribe(data => {
      this.TransaccionesList = data;
    });
  }

  /* words.forEach(function(word) {
    console.log(word);
    if (word === 'dos') {
      words.shift();
    }
  });
   */
  detalleAsientosClick(item) {

    /* array = array[
      campo1:valor,
      campo2:valor,
      array:array2[
      campo1:valor
      ],
      campo3:valor
      ]; */

    this.ModalTitle = "Contenido datos";
    for (let i = 0; i < item.length; i++) {
      console.log("Reportes/ detalle aSientos/ idA_st con FOr...");
      console.log(this.AsientosList[i]);
    }
    this.service.getAsientosId(item).subscribe(data => {
      this.AsientosList = data;

      //this.getFor(data);
    });


  }

  buscarRepLib() {
    this.ActivarbtnPDF = true;
    this.ActivarReporLib = true;
    this.service.searchReportesLib(this.fechini_libdiario, this.fechfin_libdiario).subscribe(data => {
      if (data == "Dato no encontrado") {
        this.LibrosList = " ";
      }
      else {
        this.lib = data;
        this.LibrosList = data;
        console.log("Reportes/ Libros ELse{/ fId--");
        console.log(this.lib[0].id_libdiario);
        this.detalleAsientosClick(this.lib[0].id_libdiario);
      }
    }),


      this.service.getAsientosId(this.lib[0].id_libdiario).subscribe(data => {
        this.AsientosList = data;
        console.log("Searc/ detalle aSientos/ idA_st");
        console.log(data);
      });
  }


  /* buscarClick2(item) {
    this.service.searchLibroMes(this.dato_select).subscribe(data => {
      if (data == "Dato no encontrado") { this.LibrosList = "Sin datos" }
      else { this.LibrosList = data; }
      console.log("datos data ");
      console.log(data);
    });
  } */


  addLibClick() {
    this.lib = {
      id_libdiario: 0,
      nume_libdiario: ""
    }
    console.log(this.lib);
    this.ModalTitle = "Nuevos datos";
    this.ActivatedAddEditLibComp = true;
  }



  deleteClick(item) {
    if (confirm("Esta seguro?")) {
      this.service.deleteCuenta(item.id_libdiario).subscribe(data => {
        alert(data.toString());
        this.refreshLibrosList();
      });
    }
  }

  closeClick() {
    this.ActivatedAddEditLibComp = false;
    this.refreshLibrosList();
  }

  refreshLibrosList() {
    this.id_libdiario = this.lib.id_libdiario;
    this.fechini_libdiario = this.lib.id_libdiario;
    this.fechfin_libdiario = this.lib.id_libdiario;
  }

}
