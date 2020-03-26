import TSCActivity = com.example.tscdll.TSCActivity;
import Bitmap = android.graphics.Bitmap;
import Canvas = android.graphics.Canvas;
import Paint = android.graphics.Paint;
import Rect = android.graphics.Rect;
import Color = android.graphics.Color;
import TextPaint = android.text.TextPaint;
import Typeface = android.graphics.Typeface;
import FileOutputStream = java.io.FileOutputStream;
import Environment = android.os.Environment;
import File = java.io.File;
import Path = android.graphics.Path;

export class Mht {

    constructor() {

    }
    public printServiceLabel(port:string,serviceId:string,labelNumber:string,clientName:string){

        let serviceBitmap:Bitmap = Bitmap.createBitmap(180,180, Bitmap.Config.ARGB_8888);
        let canvas: Canvas = new Canvas(serviceBitmap);

        canvas.rotate(180,90,90);
        canvas.drawRGB(255,255,255);

        let tpServiceId = new TextPaint();
        let tpLabelNumber = new TextPaint();
        let tpClientName = new TextPaint();
        let linePaint = new Paint(Color.BLACK);
        canvas.drawLine(20,0,20,180,linePaint);

        tpServiceId.setAntiAlias(false);
        tpServiceId.setTextSize(40);
        tpServiceId.setTypeface(Typeface.create(Typeface.DEFAULT, Typeface.BOLD));
        tpServiceId.setColor(Color.BLACK);

        tpLabelNumber.setAntiAlias(false);
        tpLabelNumber.setTextSize(40);
        tpLabelNumber.setTypeface(Typeface.create(Typeface.DEFAULT, Typeface.BOLD_ITALIC));
        tpLabelNumber.setColor(Color.BLACK);

        tpClientName.setAntiAlias(false);
        tpClientName.setTextSize(14);
        tpClientName.setColor(Color.BLACK);

        this.drawArrow(canvas,linePaint,0,0);
        this.drawArrow(canvas,linePaint,0,70);
        this.drawArrow(canvas,linePaint,0,140);

        this.drawCenterHorizontalOffset(canvas,tpServiceId, 40,serviceId,10);
        this.drawCenterHorizontalOffset(canvas,tpLabelNumber, 100,"#"+labelNumber,10);
        this.drawCenterHorizontalOffset(canvas,tpClientName, 170,clientName,10);
        canvas.save();

        //this.saveBitmapToSD(serviceBitmap);

        return new Promise<string>((resolve, reject) => {

            let tscActivity = new TSCActivity();

            tscActivity.openport(port);
            tscActivity.sendcommand("SIZE 58 mm, 25 mm\r\n");
            //TscDll.sendcommand("GAP 3 mm, 0 mm\r\n");//Gap media
            tscActivity.clearbuffer();
            tscActivity.sendcommand("SPEED 4\r\n");
            tscActivity.sendcommand("CODEPAGE UTF-8\r\n");
            tscActivity.sendcommandUTF8("DENSITY 4\r\n");
            tscActivity.sendcommandUTF8("DIRECTION 1\r\n");
            tscActivity.sendbitmap(180, 0, serviceBitmap);
            tscActivity.qrcode(180, 180, "M", "8", "A", "180", "M1", "S7", serviceId);
            tscActivity.printlabel(1, 1);
            let res = tscActivity.closeport(5000);
            if(res == "1") {
                resolve("Printed");
            } else {
                reject("Print Error");
            }
        });

    }

    public printProductLabel(port:string,sku:string,price:string,brand:string,model:string){

        let productBitmap:Bitmap = Bitmap.createBitmap(180,180, Bitmap.Config.ARGB_8888);
        let canvas: Canvas = new Canvas(productBitmap);
        canvas.drawRGB(255,255,255);
        let tpSKU = new TextPaint();
        let tpBrand = new TextPaint();
        let tpPrice = new TextPaint();

        tpSKU.setAntiAlias(false);
        tpSKU.setTextSize(40);
        tpSKU.setTypeface(Typeface.create(Typeface.DEFAULT, Typeface.BOLD));
        tpSKU.setColor(Color.BLACK);

        tpPrice.setAntiAlias(false);
        tpPrice.setTextSize(30);
        tpPrice.setColor(Color.BLACK);

        tpBrand.setAntiAlias(false);
        tpBrand.setTextSize(20);
        tpBrand.setColor(Color.BLACK);

        this.drawCenterHorizontal(canvas,tpSKU, 40,sku);
        this.drawCenterHorizontal(canvas,tpPrice, 100,price);
        this.drawCenterHorizontal(canvas,tpBrand, 140,brand.toUpperCase());
        this.drawCenterHorizontal(canvas,tpBrand, 170,model.toUpperCase());
        canvas.save();

        //this.saveBitmapToSD(productBitmap);

        return new Promise<string>((resolve, reject) => {

            let tscActivity = new TSCActivity();

            tscActivity.openport(port);
            tscActivity.sendcommand("SIZE 58 mm, 25 mm\r\n");
            //TscDll.sendcommand("GAP 3 mm, 0 mm\r\n");//Gap media
            tscActivity.clearbuffer();
            tscActivity.sendcommand("SPEED 4\r\n");
            tscActivity.sendcommand("CODEPAGE UTF-8\r\n");
            tscActivity.sendcommandUTF8("DENSITY 4\r\n");
            tscActivity.sendcommandUTF8("DIRECTION 1\r\n");
            tscActivity.sendbitmap(180, 0, productBitmap);
            tscActivity.qrcode(10, 10, "M", "8", "A", "0", "M1", "S7", sku);
            tscActivity.printlabel(1, 1);
            let res = tscActivity.closeport(5000);
            if(res == "1") {
                resolve("Printed");
            } else {
                reject("Print Error");
            }
        });

    }

    public printText(text: string): Promise<string> {

        let textBitmap:Bitmap = Bitmap.createBitmap(180,180, Bitmap.Config.ARGB_8888);
        let canvas: Canvas = new Canvas(textBitmap);
        let tpText = new TextPaint();

        tpText.setAntiAlias(false);
        tpText.setTextSize(40);
        tpText.setTypeface(Typeface.create(Typeface.DEFAULT, Typeface.BOLD));
        tpText.setColor(Color.BLACK);

        canvas.drawRGB(255,255,255);
        //canvas.drawRGB(0,0,0);
        this.drawCenterHorizontal(canvas, tpText, 100, text);

        canvas.save();

        //this.saveBitmapToSD(imageBitmap);

        return new Promise<string>((resolve, reject) => {

            let tscActivity = new TSCActivity();

            tscActivity.openport("DC:0D:30:88:CD:69");
            tscActivity.sendcommand("SIZE 58 mm, 25 mm\r\n");
            //TscDll.sendcommand("GAP 2 mm, 0 mm\r\n");//Gap media
            tscActivity.clearbuffer();
            tscActivity.sendcommand("SPEED 4\r\n");
            tscActivity.sendcommand("DENSITY 4\r\n");
            tscActivity.sendcommand("DIRECTION 1\r\n");
            tscActivity.sendcommand("CODEPAGE UTF-8\r\n");
            tscActivity.sendbitmap(0, 0, textBitmap);
            tscActivity.printlabel(1, 1);
            let res = tscActivity.closeport(5000);
            if(res == "1") {
                resolve("Printed");
            } else {
                reject("Print Error");
            }
        });
    }

    private drawCenterCanvas(canvas:Canvas, paint:Paint, text:string) {
        let r:Rect = new Rect();
        canvas.getClipBounds(r);
        let cHeight:number = r.height();
        let cWidth:number = r.width();
        paint.setTextAlign(Paint.Align.LEFT);
        paint.getTextBounds(text, 0, text.length, r);
        let x:number = cWidth / 2 - r.width() / 2 - r.left;
        let y:number = cHeight / 2 + r.height() / 2 - r.bottom;
        canvas.drawText(text, x, y, paint);
    }

    private drawCenterHorizontal(canvas:Canvas, paint:Paint, vertical:number, text:string) {
        let r:Rect = new Rect();
        canvas.getClipBounds(r);
        let cWidth:number = r.width();
        paint.setTextAlign(Paint.Align.LEFT);
        paint.getTextBounds(text, 0, text.length, r);
        let x:number = cWidth / 2 - r.width() / 2 - r.left;
        canvas.drawText(text, x, vertical, paint);
    }

    private drawCenterHorizontalOffset(canvas:Canvas, paint:Paint, vertical:number, text:string,offset:number) {
        let r:Rect = new Rect();
        canvas.getClipBounds(r);
        let cWidth:number = r.width();
        paint.setTextAlign(Paint.Align.LEFT);
        paint.getTextBounds(text, 0, text.length, r);
        let x:number = cWidth / 2 - r.width() / 2 - r.left;
        canvas.drawText(text, x+offset, vertical, paint);
    }

    private saveBitmapToSD(bitmap:Bitmap): boolean {
        try {
            let sd:File = Environment.getExternalStorageDirectory();
            let dest = new File(sd, "nativescript-mht-printer.png");
            let out: FileOutputStream = new FileOutputStream(dest) ;
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, out);
            out.flush();
            out.close();
        } catch (e) {
            console.log(e);
            return false;
        }
        return true;
    }

    private drawArrow(canvas:Canvas,paint:Paint,x:number,y:number){
        let mPath:Path = new Path();
        mPath.moveTo(x, y + 20);
        mPath.lineTo(x + 10, y + 20);
        mPath.lineTo(x + 10, y + 10);
        mPath.lineTo(x + 20, y + 25);
        mPath.lineTo(x + 10, y + 40);
        mPath.lineTo(x + 10, y + 30);
        mPath.lineTo(x , y + 30);
        mPath.lineTo(x, y + 20);
        mPath.close();
        canvas.drawPath(mPath, paint);
    }


}
