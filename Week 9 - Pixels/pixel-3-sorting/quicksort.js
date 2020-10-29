
  // Asynchronous Definition of Quick Sort Function 
  async function quickSort(arr, start, end, sortAttr) { 

    if(start >= end) { 
        return; 
    } 
    let index = await partition(arr, start, end, sortAttr); 
    states[index] = -1; 
      
    // Promise.all is used so that each function 
    // should invoke simultaneously 
    await Promise.all([quickSort(arr, start, index-1, sortAttr), 
            quickSort(arr, index+1, end, sortAttr)]); 
  } 
  
  // Asynchronous Definition of Partition Function 
  async function partition(arr, start, end, sortAttr) { 

    for(let i = start; i< end; i++) { 
        states[i] = 1; 
    } 

    let pivotIndex = start; 
    let pivotValue = arr[end][sortAttr]; 
    states[pivotIndex] = 0; 

    for(let i = start; i < end; i++) { 

        newVal = arr[i][sortAttr];
    
        if(newVal <pivotValue) { 
            await swap(arr, i, pivotIndex); 
            states[pivotIndex] = -1; 
            pivotIndex++; 
            states[pivotIndex] = 0; 
        } 
    } 
      
    await swap(arr, pivotIndex, end); 
      
        for(let i = start; i < end; i++) { 
            states[i] = -1; 
        } 
      
    return pivotIndex; 
  } 
  
  async function swap(arr, a, b) {       
    let t = arr[a]; 
    arr[a] = arr[b]; 
    arr[b] = t; 
  } 
  
