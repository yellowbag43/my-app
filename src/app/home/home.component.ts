import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Router  } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router : Router) { }


  items: MenuItem[];
 
  home() {
    this.router.navigate([''] )     
  }

  ngOnInit() {
      this.items = [
          {
              label:'Jobs',
              icon:'pi pi-fw pi-file',
              items:[
                {
                    label:'Log Jobs',
                    icon:'pi pi-fw pi-book',
                    routerLink: ['jobadd']
                },
                  {
                      label:'Category',
                      icon:'pi pi-fw pi-clone',
                      routerLink: ['jobtypes']
                  },
                  {
                      separator:true
                  },
                  {
                      label:'Export',
                      icon:'pi pi-fw pi-external-link'
                  }
              ]
          },
          {
              label:'Reports',
              icon:'pi pi-fw pi-pencil',
              items:[
                  {
                      label:'Job Wise',
                      icon:'pi pi-fw pi-align-left',
                      routerLink: ['reportjobwise']
                  },
                  {
                      label:'Right',
                      icon:'pi pi-fw pi-align-right'
                  },
                  {
                      label:'Center',
                      icon:'pi pi-fw pi-align-center'
                  },
                  {
                      label:'Justify',
                      icon:'pi pi-fw pi-align-justify'
                  },

              ]
          },
          {
              label:'Users',
              icon:'pi pi-fw pi-user',
              items:[
                  {
                      label:'New',
                      icon:'pi pi-fw pi-user-plus',
                      routerLink: ['adduser']
                  },
                  {
                      label:'Modify',
                      icon:'pi pi-fw pi-user-edit',
                      routerLink: ['modifyuser']

                  },
                  {
                    label:'Change Password',
                    icon:'pi pi-fw pi-key',
                    routerLink: ['changepassword']
                }
              ]
          },
          {
              label:'Employees',
              icon:'pi pi-fw pi-users',
              items:[
                {
                    label:'Attendance',
                    icon:'pi pi-fw pi-file-edit',
                    items:[
                    {
                        label:'Log',
                        icon:'pi pi-fw pi-user-plus',
                        routerLink: ['attendancelog']
                    },
                    {
                        label:'Query',
                        icon:'pi pi-fw pi-clone',
                        routerLink: ['queryattendance']
                    },
                    {
                        label:'Categories',
                        icon:'pi pi-fw pi-book',
                        routerLink: ['attendancetype']
                    },
                    ]
                },

                  {
                      label:'New',
                      icon:'pi pi-fw pi-plus',
                      items:[
                      {
                          label:'Employee',
                          icon:'pi pi-fw pi-user-plus',
                          routerLink: ['addemployee']
                      },
                      ]
                  },
                  {
                      label:'Modify',
                      icon:'pi pi-fw pi-pencil',
                      items:[
                      {
                          label:'Employee',
                          icon:'pi pi-fw pi-user-plus',
                          routerLink: ['listemployee']
                      },
                    ]
                  }
              ]
          },
          {
              label:'Quit',
              icon:'pi pi-fw pi-power-off',
              routerLink: ['login']
          }
      ];
  }

}

