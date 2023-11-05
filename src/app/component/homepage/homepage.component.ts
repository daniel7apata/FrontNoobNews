import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Publication } from 'src/app/model/publication';
import { PublicationService } from 'src/app/service/publication.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{


pub1:Publication = new Publication();
pub2:Publication = new Publication();
pub3:Publication = new Publication();
  
//todo esto copialo, cambia Medicine por tu entidad
dataSource: MatTableDataSource<Publication> = new MatTableDataSource();
displayedColumns: string[] = [
  'titular',
  'bajada',
  'fecha',
  'Ver'
];
@ViewChild(MatPaginator) paginator!: MatPaginator;

slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});
//aca debes referenciar al EntidadService de tu entidad
constructor(private pubS: PublicationService) {}
ngOnInit(): void {
  this.pubS.list().subscribe((data) => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  });
  this.pubS.getList().subscribe((data) => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  });




  this.slides[0] = {
    id: 0,
    src: 'https://i.ibb.co/4Vkqq33/imaDEPOR.jpg',
    title: 'Deportes',
    subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
  };
  this.slides[1] = {
    id: 1,
    src: 'https://i.ibb.co/HH1Pm0P/imaUNI.jpg',
    title: 'Universidad',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }
  this.slides[2] = {
    id: 2,
    src: 'https://i.ibb.co/KL1RS57/ima-POLITI.jpg',
    title: 'Politica',
    subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
  }


  let tempPub;

  this.pubS.list().subscribe((data) => {
    tempPub = data.find((publi) => publi.idPublication === 1); if (tempPub) {this.pub1 = tempPub;} 
  });

  this.pubS.list().subscribe((data) => {
    tempPub = data.find((publi) => publi.idPublication === 2); if (tempPub) {this.pub2 = tempPub;} 
  });

  this.pubS.list().subscribe((data) => {
    tempPub = data.find((publi) => publi.idPublication === 3); if (tempPub) {this.pub3 = tempPub;} 
  });

  
}


filter(en: any) {
  this.dataSource.filter = en.target.value.trim();
}





}
