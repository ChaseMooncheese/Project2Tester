(function(_0x25d6d7,_0x5a1fbb){const _0x58329b=_0xc0b5,_0x5f3b93=_0x25d6d7();while(!![]){try{const _0x1cca9b=-parseInt(_0x58329b(0x1ed))/0x1*(-parseInt(_0x58329b(0x1eb))/0x2)+-parseInt(_0x58329b(0x1f2))/0x3*(parseInt(_0x58329b(0x1f1))/0x4)+parseInt(_0x58329b(0x1e5))/0x5+-parseInt(_0x58329b(0x1f4))/0x6+parseInt(_0x58329b(0x1ef))/0x7+-parseInt(_0x58329b(0x1ec))/0x8*(parseInt(_0x58329b(0x1e2))/0x9)+parseInt(_0x58329b(0x1e7))/0xa;if(_0x1cca9b===_0x5a1fbb)break;else _0x5f3b93['push'](_0x5f3b93['shift']());}catch(_0x417cd0){_0x5f3b93['push'](_0x5f3b93['shift']());}}}(_0x3d12,0x58050));function _0x3d12(){const _0xabbe37=['2dwcPcQ','keys','1522346kfleCE','split','64652tLihgt','111bBMbrU','push','1759146OpUhvb','en-US','toLocaleString','27QLFbXC','sort','reduce','1540075xMZqKZ','forEach','8050420ceWkvE','max','matrix','length','211996mhkvLi','775416ZBPxJd'];_0x3d12=function(){return _0xabbe37;};return _0x3d12();}import*as _0x3f8d04 from'mathjs';function _0xc0b5(_0x17f6f3,_0x2a12a9){const _0x3d12fd=_0x3d12();return _0xc0b5=function(_0xc0b542,_0x43b433){_0xc0b542=_0xc0b542-0x1e0;let _0x2a87c5=_0x3d12fd[_0xc0b542];return _0x2a87c5;},_0xc0b5(_0x17f6f3,_0x2a12a9);}export const powerIteration=(_0xab1d2d,_0x352c84)=>{const _0x3b960e=_0xc0b5,_0x124c44=_0x3f8d04[_0x3b960e(0x1e9)]([..._0xab1d2d]),_0x5a8f12=_0x3f8d04['multiply'](_0x124c44,_0x352c84);return _0x5a8f12;};export default function (input){const _0x428c6e=_0xc0b5,lines=input[_0x428c6e(0x1f0)]('\x0a'),tokensInLine0=lines[0x0][_0x428c6e(0x1f0)]('\x20'),numLines=parseInt(tokensInLine0[0x0]),numPowerIterations=parseInt(tokensInLine0[0x1]),websiteToID={},outDegrees={};let numWebsites=0x0;const matrix=[[]];for(let i=0x1;i<numLines+0x1;i++){const tokens=lines[i]['split']('\x20'),fromSite=tokens[0x0],destinationSite=tokens[0x1];if(!(fromSite in websiteToID)){const id=numWebsites;websiteToID[fromSite]=id,numWebsites++;}if(!(destinationSite in websiteToID)){const id=numWebsites;websiteToID[destinationSite]=id,numWebsites++;}const fromSiteID=websiteToID[fromSite],destinationSiteID=websiteToID[destinationSite];matrix[destinationSiteID]==undefined&&(matrix[destinationSiteID]=[]),matrix[destinationSiteID][fromSiteID]!=0x1&&(matrix[destinationSiteID][fromSiteID]=0x1,outDegrees[fromSiteID]=fromSiteID in outDegrees?outDegrees[fromSiteID]+0x1:0x1);}for(const website in websiteToID){!(websiteToID[website]in outDegrees)&&(outDegrees[websiteToID[website]]=0x0);}const numRows=matrix[_0x428c6e(0x1ea)],listOfColumnLengths=matrix[_0x428c6e(0x1e4)]((lengths,row)=>{const _0x4f39ff=_0x428c6e;return row!=undefined&&lengths[_0x4f39ff(0x1f3)](row['length']),lengths;},[]),numCols=Math[_0x428c6e(0x1e8)](...listOfColumnLengths),numVertices=Math[_0x428c6e(0x1e8)](numRows,numCols);for(let i=0x0;i<numVertices;i++){matrix[i]==undefined&&(matrix[i]=[]);}for(let row=0x0;row<numVertices;row++){for(let col=0x0;col<numVertices;col++){matrix[row][col]===0x1?matrix[row][col]=0x1/outDegrees[col]:matrix[row][col]=0x0;}}let ranks=[];for(let i=0x0;i<numVertices;i++){ranks[i]=0x1/numVertices;}let rankMatrix=_0x3f8d04['matrix'](ranks);for(let i=0x1;i<numPowerIterations;i++){rankMatrix=powerIteration(matrix,rankMatrix);}const websiteURLs=Object[_0x428c6e(0x1ee)](websiteToID)[_0x428c6e(0x1e3)](),websitesToRanks={};websiteURLs[_0x428c6e(0x1e6)](url=>{const id=websiteToID[url];websitesToRanks[url]=rankMatrix['get']([id]);});const outputArray=[],formatTwoDecimalPlaces=num=>num[_0x428c6e(0x1e1)](_0x428c6e(0x1e0),{'minimumFractionDigits':0x2,'maximumFractionDigits':0x2});for(const siteName in websitesToRanks){const rank=parseFloat(websitesToRanks[siteName]),str=siteName+'\x20'+formatTwoDecimalPlaces(rank);outputArray[_0x428c6e(0x1f3)](str);}return outputArray;}