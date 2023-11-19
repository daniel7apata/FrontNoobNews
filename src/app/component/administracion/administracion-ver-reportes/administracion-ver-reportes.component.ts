import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { ChartOptions, ChartDataset} from 'chart.js';
import { University } from 'src/app/model/university';
import { CategoryService } from 'src/app/service/category.service';
import { LogicrolService } from 'src/app/service/logicrol.service';
import { PublicationService } from 'src/app/service/publication.service';
import { UniversityService } from 'src/app/service/university.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-administracion-ver-reportes',
  templateUrl: './administracion-ver-reportes.component.html',
  styleUrls: ['./administracion-ver-reportes.component.css']
})
export class AdministracionVerReportesComponent implements OnInit {
  barChartOptions1:ChartOptions = {
    responsive: true,
    maintainAspectRatio:true,
  };

  barChartLabels1:string[]=[];
  barChartType1:ChartType='bar';
  barChartLegend1=true;
  barChartData1:ChartDataset[]=[];


  barChartOptions2:ChartOptions = {
    responsive: true,
    maintainAspectRatio:true,
  };

  barChartLabels2:string[]=[];
  barChartType2:ChartType='pie';
  barChartLegend2=true;
  barChartData2:ChartDataset[]=[];


  barChartOptions3:ChartOptions = {
    responsive: true,
    maintainAspectRatio:true,
  };
  barChartLabels3:string[]=[];
  barChartType3:ChartType='bar';
  barChartLegend3=true;
  barChartData3:ChartDataset[]=[];


  barChartOptions4:ChartOptions = {
    responsive: true,
    maintainAspectRatio:true,
  };
  barChartLabels4:string[]=[];
  barChartType4:ChartType='bar';
  barChartLegend4=true;
  barChartData4:ChartDataset[]=[];



  barChartOptions5:ChartOptions = {
    responsive: true,
    maintainAspectRatio:true,
  };
  barChartLabels5:string[]=[];
  barChartType5:ChartType='doughnut';
  barChartLegend5=true;
  barChartData5:ChartDataset[]=[];




  constructor(

    private cS:CategoryService,
    private lr:LogicrolService,
    private uS:UsersService,
    private pS:PublicationService,
    private uniS:UniversityService,
  ) { }

  ngOnInit(): void {


    this.cS.getPublicationbyCategory().subscribe((data) => {
      this.barChartLabels1 = data.map((item) => item.nameCategory);
      this.barChartData1 = [
        {
          data: data.map((item) => item.quantityPublication),
          label:'Publicaciones',
          //backgroundColor:'rgba(255,255,0,0.5)'
        },
      ];
    });


    this.lr.getUserByRole().subscribe((data) => {
      this.barChartLabels2 = data.map((item) => item.description);
      this.barChartData2 = [
        {
          data: data.map((item) => item.quantityUser),
          label:'Usuarios',
        },
      ];
    });


    this.uS.getCountInteractionByUsers().subscribe((data) => {
      this.barChartLabels3 = data.map((item) => item.nameUsers);
      this.barChartData3 = [
        {
          data: data.map((item) => item.quantityInteraction),
          label:'Interacciones',
          backgroundColor:'rgba(255,255,255,1)',
        },
      ];
    });


    this.pS.getCountInteractionsByPublication().subscribe((data) => {
      this.barChartLabels4 = data.map((item) => item.headline);
      this.barChartData4 = [
        {
          data: data.map((item) => item.quantityInteraction),
          label:'Interacciones',
        },
      ];
    });

    this.uniS.getUserByUniversity().subscribe((data) => {
      this.barChartLabels5 = data.map((item) => item.nameUniversity);
      this.barChartData5 = [
        {
          data: data.map((item) => item.quantityUser),
          label:'Usuarios',
        },
      ];
    });




  }
}
