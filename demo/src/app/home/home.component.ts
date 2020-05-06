import { Component, OnInit } from "@angular/core";
import { Page} from "@nativescript/core";
import { Mht } from "nativescript-mht-printer";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    btPrinterMac:string="DC:0D:30:88:CD:69";
    mht:Mht;
    result:string;

    constructor(private page: Page) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.mht = new Mht();
    }

    printText(){
        this.mht.isBluetoothEnabled().then((value) => {
            if(value) {
                this.mht.printText(this.btPrinterMac,"Hello ;)").then(value => {
                    this.result = value.toString();
                });
            } else {
                this.mht.enable().then((value)=>{
                    if(value) {
                        this.mht.printText(this.btPrinterMac, "Hello ;)").then(value => {
                            this.result = value.toString();
                        });
                    }
                })
            }
        });
    }

    printProductLabel(){
        this.mht.isBluetoothEnabled().then((value) => {
            if(value) {
                this.mht.printProductLabel(this.btPrinterMac,"SKU","$PRICE","Brand","Model").then(value => {
                    this.result = value.toString();
                });
            } else {
                this.mht.enable().then((value)=>{
                    if (value) {
                        this.mht.printProductLabel(this.btPrinterMac,"SKU","$PRICE","Brand","Model").then(value => {
                            this.result = value.toString();
                        });
                    }
                })
            }
        });
    }

    printServiceLabel(){
        this.mht.isBluetoothEnabled().then((value) => {
            if(value) {
                this.mht.printServiceLabel(this.btPrinterMac,"ID","NU","Client Name").then(value => {
                    this.result = value.toString();
                });
            } else {
                this.mht.enable().then((value)=>{
                    if(value) {
                        this.mht.printServiceLabel(this.btPrinterMac,"ID","NU","Client Name").then(value => {
                            this.result = value.toString();
                        });
                    }
                })
            }
        });
    };
    printClientLabel(){
        this.mht.isBluetoothEnabled().then((value) => {
            if(value) {
                this.mht.printClientLabel(this.btPrinterMac,"ID","https://www.google.com","Client Name","05332332323","sdfdss.dfsdf@sdfsdfs.com","AXCED3D").then(value => {
                    this.result = value.toString();
                });
            } else {
                this.mht.enable().then((value)=>{
                    if(value) {
                        this.mht.printClientLabel(this.btPrinterMac,"ID","https://www.google.com","Client Name","05332332323","sdfdss.dfsdf@sdfsdfs.com","AXCED3D").then(value => {
                            this.result = value.toString();
                        });
                    }
                })
            }
        });

    };
}
