import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Publication } from 'src/app/model/publication';
import { PublicationService } from 'src/app/service/publication.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

//todo esto copialo, cambia Medicine por tu entidad
dataSource: MatTableDataSource<Publication> = new MatTableDataSource();
displayedColumns: string[] = [
  'titular',
  'fecha',
  'bajada'
];
@ViewChild(MatPaginator) paginator!: MatPaginator;

searchText:string = '';


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
}
filter() {
  this.dataSource.filter = this.searchText.trim().toLowerCase();
}

}
