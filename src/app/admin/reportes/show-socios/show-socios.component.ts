import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-show-socios',
  templateUrl: './show-socios.component.html',
  styleUrls: ['./show-socios.component.css']
})
export class ShowSociosComponent implements OnInit {

  constructor(private service: ApiService) { }

  SociosList:any=[];
  dato_select: string='';
  p=1;
  ActivarbtnPDF:boolean=false;

  estado:string='ACTIVOS';

  ngOnInit(): void {
   
  }

  buscarSocio(item) {
    this.ActivarbtnPDF=true;
    this.service.getSociosList(item).subscribe(data => {
      this.SociosList = data;
      if(this.dato_select==='1')
      {this.estado='ACTIVOS'}
      else{this.estado='INACTIVOS'}
    });
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

  async showPdf2() {
    var headers = {
      fila_0: {
        col_1: { text: 'Nombres', style: 'styleTablasHeader', alignment: 'center' },
        col_2: { text: 'Apellidos', style: 'styleTablasHeader', alignment: 'center' },
        col_3: { text: 'Correo', style: 'styleTablasHeader', alignment: 'center'},
        col_4: { text: 'Docente', style: 'styleTablasHeader', alignment: 'center' },
        col_5: { text: 'Contacto', style: 'styleTablasHeader', alignment: 'center' }
      }
    
    }

    var body = [];
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
    for (var key in this.SociosList) {
      if (this.SociosList.hasOwnProperty(key)) {
        var data = this.SociosList[key];
        var row = new Array();
        row.push(data.nomb_socio);
        row.push(data.apel_socio);
        row.push(data.corr_socio);
        row.push(data.deta_tiposocio);
        row.push(data.celu_socio);
        body.push(row);
      }
    }

    var docDefinition = {

      footer: function (currentPage, pageCount) {
        return [
          {
            text:
              "Página "+currentPage.toString() +
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
        , { text: 'LISTADO DE SOCIOS ' + this.estado + '\n\n', style: 'styleReporAction' },
        {
          style: 'styleTablasBody',
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            widths: [80, 80, '*','auto', 'auto'],
            headerRows: 1,
            body: body
          }
        }
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
          fontSize: 11,
          italic: true,
          alignment: 'center'
        },
        debe_transaccion: {
          fontSize: 11,
          alignment: 'right'
        },
        styleTablasBody: {
          fontSize: 11,
          alignment: 'justify'
        }
      },


    };
    pdfMake.createPdf(docDefinition).open();
  }

}
