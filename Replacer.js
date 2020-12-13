var textToReplace = prompt('Text to replace:')

var file = new File().openDlg();

var csvFile = File.openDialog('Select a CSV File','comma-separated-values(*.csv):*.csv;');

if (csvFile != null)
{
    names = readInCSV(csvFile);
}

var destFolder = Folder.selectDialog( 'Select the folder where you want to save PDF files.', '~' );
var doc = open(file);

for (i = 0; i < doc.textFrames.length; i++)
{
   contentString = doc.textFrames[i].contents;
   if (contentString.indexOf(textToReplace) != -1)
   {
      for(var idx = 0; idx < names.length; idx++)
      {
         doc.textFrames[i].contents = names[idx][0];
         doc.textFrames[i].createOutline();  

         targetFile = new File(destFolder + '/' +  names[idx][0] + '.pdf');
         pdfSaveOpts = getPDFOptions();
         doc.saveAs(targetFile, pdfSaveOpts);

         undo();
      }
   }
}
activeDocument.close(SaveOptions.DONOTSAVECHANGES);


function readInCSV(fileObj)
{
     var fileArray = new Array();
     fileObj.open('r');
     fileObj.seek(0, 0);
     while(!fileObj.eof)
     {
          var thisLine = fileObj.readln();
          var csvArray = thisLine.split(',');
          fileArray.push(csvArray);
     }
     fileObj.close();
     return fileArray;
}

function getPDFOptions()
{
   var pdfSaveOpts = new PDFSaveOptions();
   pdfSaveOpts.acrobatLayers = false;
   pdfSaveOpts.colorBars = false;
   pdfSaveOpts.colorCompression = CompressionQuality.AUTOMATICJPEGHIGH;
   pdfSaveOpts.compressArt = true;
   pdfSaveOpts.embedICCProfile = true;
   pdfSaveOpts.enablePlainText = true;
   pdfSaveOpts.generateThumbnails = false;
   pdfSaveOpts.optimization = true;
   pdfSaveOpts.pageInformation = false;
   return pdfSaveOpts;
}