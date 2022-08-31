async function getList(){
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const listArray = await response.json();
    return listArray;
}

async function main() {
    let listdata = await getList();
    let itemsCount = 10;
    let currentPage=0;
    const form = document.forms.list__form;
    const titleInput = form.elements.list__formTitle;
    const bodyInput = form.elements.list__formBody;
    const formBtn = form.elements.list__formBtn;
   
    let listInput = document.querySelector('.list__input');
    listInput.addEventListener('input', () =>{
        if(listInput.value===''){
            showList(listdata, itemsCount, 0)
            showPagination(listdata, itemsCount)
        } else{
            let filterList = listdata.filter((item) =>{
                return item.title.includes(listInput.value) || item.body.includes(listInput.value)
            })
            showList(filterList, itemsCount,0)
            showPagination(filterList, itemsCount)
        }    
    })
    formBtn.addEventListener('click', (event) =>{
        event.preventDefault();
        if(titleInput.value!= '' && bodyInput.value!=''){
            listdata.push({id:Math.random(), title:titleInput.value, body:bodyInput.value})
            showList(listdata, itemsCount, currentPage)
            showPagination(listdata, itemsCount)
            console.log(listdata)
        }
       
    })
    function showList(list, rowPerPage, page){
        const listItemsElement = document.querySelector('.list__items');
        listItemsElement.innerHTML ='';
        const start =  rowPerPage * page;
        const end = start + rowPerPage;
        const paginatedData = list.slice(start, end)
        paginatedData.forEach((item) => {
            const listItemElement = document.createElement('div');
            const listItemTitleElement = document.createElement('div');
            const listItemBodyElement = document.createElement('div');
            const  listItemBtnElement = document.createElement('button');
          

            listItemElement.classList.add('list__item');
            listItemTitleElement.classList.add('list__item-title');
            listItemBodyElement.classList.add('list__item-body');
            listItemBtnElement.classList.add('list__item-btn')

            listItemTitleElement.innerText = `${item.title}`;
            listItemBodyElement.innerText = `${item.body}`;
            listItemBtnElement.innerText =`x`

            listItemElement.appendChild(listItemTitleElement);
            listItemElement.appendChild(listItemBodyElement);
            listItemElement.appendChild(listItemBtnElement);
            listItemsElement.appendChild(listItemElement);
            

            listItemBtnElement.addEventListener('click', () =>{
                let newArray = listdata.filter((filterItem) => filterItem.id != item.id);
                listdata= newArray;
                showList(listdata, itemsCount, currentPage)
                showPagination(listdata, itemsCount)
            })
        })
    }
    function showPagination(listdata, rowPerPage) {
       const paginationElement = document.querySelector('.pagination'); 
       paginationElement.innerHTML ='';
       const pagesCount = Math.ceil(listdata.length / rowPerPage);

       for(let i = 0; i < pagesCount; i++){
        const button = document.createElement('button');
        button.classList.add('pagination__btn')
        button.innerText =i+1
        button.addEventListener('click', () => {
            currentPage = i;
            showList(listdata, itemsCount, currentPage)
        })
        paginationElement.appendChild(button)
       }
    }
   
    showList(listdata, itemsCount, currentPage)
    showPagination(listdata, itemsCount)
}

main();