document.addEventListener('DOMContentLoaded', function () {
    const addEvent = async () => {
      console.log('Start GetData');
      await window.ipcRenderer.send('getdata');
      console.log('Done GetData');
    };
  
    console.log('Start');
    addEvent();
  });
  
  window.ipcRenderer.on('return', (data) => {
    // Do something with myitems
    console.log('Received data...');
    console.log(data);
  
    // Get the "content" div element
    const contentDiv = document.getElementById('content');
  
    // Set the received data as the inner HTML of the "content" div
    contentDiv.innerHTML = data.html;
  
    document.body.style.backgroundColor = data.bgColor || '#fff';
  });
  