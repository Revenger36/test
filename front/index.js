function loadForms() {
  return new Promise ((resolve, reject) => {
    $.ajax({
      url: 'http://localhost:3000/api/v1/transacao',
      method: 'GET',
      success: function (data) {
        data.forEach(function (form) {
          console.log('Forms loaded successfully:', data)
          bindEvents(createForm()); 
          valueFill(form); 
        });
        resolve()
      },
      error: function (err) {
        reject()
        console.error('Error loading forms:', err);
      }
  })
  });
}
function delProrateById(y) {
  $.ajax({
    url: `http://localhost:3000/api/v1/rateio/${y}`, 
    method: 'DELETE',
    contentType: 'application/json',
    success: function(response) {
      console.log('Rateio deletado com sucesso successfully:', response);
    },
    error: function(err) {
      console.error('Error updating forms:', err);
    }
  })
}
function addRat(y, x) {
  $.ajax({
    url: `http://localhost:3000/api/v1/rateio/${y}`, 
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(x),
    success: function(response) {
      console.log('Forms updated successfully:', response);
    },
    error: function(err) {
      console.error('Error updating forms:', err);
    }
  })
}

function updateRateio(x) {
  $.ajax({
    url: 'http://localhost:3000/api/v1/rateio', 
    method: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(x),
    success: function(response) {
      console.log('Forms updated successfully:', response);
    },
    error: function(err) {
      console.error('Error updating forms:', err);
    }
  })
}
function updateTransaction(x) {
  // console.log(x)
  $.ajax({
    url: 'http://localhost:3000/api/v1/transacao/atualizar',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(x),
    success: function(response) {
      console.log('Forms updated successfully:', response);
    },
    error: function(err) {
      console.error('Error updating forms:', err);
    }
  });

}
function insertTransaction(data) {
  $.ajax({
    url: 'http://localhost:3000/api/v1/transacao/',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function (response) {
      console.log('Forms updated successfully:', response);
    },
    error: function (err) {
      console.error('Error updating forms:', err);
    }
  });
}
function getProd() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'http://localhost:3000/api/v1/produto',
      method: 'GET',
      success: function (data) {
        // console.log(data); 
        resolve(data);    
      },
      error: function (err) {
        console.error('Error loading products:', err);
        reject(err);      
      }
    });
  });
}
function getCusto() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'http://localhost:3000/api/v1/centrocusto',
      method: 'GET',
      success: function (data) {
        // console.log(data); 
        resolve(data);    
      },
      error: function (err) {
        console.error('Error loading products:', err);
        reject(err);      
      }
    });
  });
}
function getGrupoServico(param) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:3000/api/v1/gruposervico/${param}`,
      method: 'GET',
      success: function (data) {
        // console.log(data); 
        resolve(data);    
      },
      error: function (err) {
        console.error('Error loading products:', err);
        reject(err);      
      }
    });
  });
}
function getGrupoOrc(param) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:3000/api/v1/grupoorcamento/${param}`,
      method: 'GET',
      success: function (data) {
        // console.log(data); 
        resolve(data);    
      },
      error: function (err) {
        console.error('Error loading products:', err);
        reject(err);      
      }
    });
  });
}
function createForm() {
  var index = $("#mainDiv div.container").length + 1;
  var corpoDiv = `
        <div id="div${index}" class="container" data-info="${index}">
         <input type="hidden" id="dataTransactionId" name="hiddenFieldName" value="">
            <div class="row mt-3">
                <div class="col">
                    <label for="produto">Produto</label>
                    <div class="input-group">
                        <input type="text" id="produto" class="form-control" data-info="0" readonly>
                        <button id="prodButton" class="btn btn-primary" type="button">+</button>
                    </div>
                </div>
                <div class="col">
                    <label for="natureza">Natureza Orçamentária</label>
                    <input type="text" id="natureza" class="form-control">
                </div>
            </div>
            <div id="divRow" class="row mt-3">
                <div class="col">
                    <label for="unidade">Unidade</label>
                    <input type="text" id="unidade" class="form-control">
                </div>
                <div class="col">
                    <label for="quantidade">Quantidade</label>
                    <input type="text" id="quantidade" class="form-control">
                </div>
                <div class="col">
                    <label for="precoUnitario">Preço Unitário</label>
                    <input type="text" id="precoUnitario" data-thousands="." data-decimal="," data-prefix="R$ " class="form-control precoUnitario">
                </div>
                <div class="col">
                    <label for="preco_total">Preço Total</label>
                    <input type="text" id="precoTotal" data-thousands="." data-decimal="," data-prefix="R$ " class="form-control precoTotal" readonly>
                </div>
                <div class="col">
                    <label for="classificacao">Classificação Contábil</label>
                    <input type="text" id="classificacao" class="form-control">
                </div>
                <div class="col">
                    <label for="rateio"></label>
                    <div>
                        <button id="ratButton" class="btn btn-primary" type="button" data-info="0">Rateio</button>
                    </div>
                </div>
                <div class="col">
                    <label for="rateio"></label>
                    <div>
                        <button id="deleteFormBtn" type="button" class="btn btn-danger">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 1 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                          </svg>
                        </button>
                    </div>
                    
                </div>
            </div>
            <div class="row mt-3">
                <div class="col">
                    <label for="centroCusto">Centro de Custo</label>
                    <div class="input-group">
                        <input type="text" id="centroCusto" class="form-control" data-info="0" readonly>
                        <button id="custoButton" class="btn btn-primary" type="button">+</button>
                    </div>
                </div>
                <div class="col">
                    <label for="grupo_servico">Grupo de Serviço</label>
                    <div class="input-group">
                        <input type="text" id="grupoServico" class="form-control" data-info="0" readonly>
                        <button id="grupoProdButton" class="btn btn-primary" type="button">+</button>
                    </div>
                </div>
                <div class="col">
                    <label for="grupo_orcamentario">Grupo Orçamentário</label>
                    <div class="input-group">
                        <input type="text" id="grupoOrcamentario" class="form-control" data-info="0" readonly>
                        <button id="grupoOrcButton" class="btn btn-primary" type="button">+</button>
                    </div>
                </div>
            </div>
            <hr>
        </div>`
        ;

  $("#mainDiv").append(corpoDiv);
  maskCreate()
  return $(`#mainDiv #div${index}`);
};
function valueFill(dado) {
  // console.log(dado.servicegroupId)
  $('#mainDiv div.container:last').each(function(a,b){


    let product = {
      "name": dado.produto,
      "id": dado.productId
    }
    $(b).find('#produto').attr('data-info', JSON.stringify(product))


    let cc = {
      "name": dado.centroCusto,
      "id": dado.costcenterId
    }
    $(b).find('#centroCusto').attr('data-info', JSON.stringify(cc))


    let grupoServ = {
      "name": dado.grupoServico,
      "id": dado.servicegroupId
    }
    $(b).find('#grupoServico').attr('data-info', JSON.stringify(grupoServ))


    let grupoOrc = {
      "name": dado.grupoOrcamentario,
      "id": dado.budgetgroupId
    }
    $(b).find('#grupoOrcamentario').attr('data-info', JSON.stringify(grupoOrc))

    $(b).find('#ratButton').attr('data-info', JSON.stringify(dado.prorates))
    $(b).find('input').each(function(a,b){
      var inputId = $(b).attr('id');
      if (dado != null) {
        $(this).val(dado[inputId])
      }
    })
    $(b).find('#precoUnitario').maskMoney('mask', parseFloat(dado.precoUnitarioMask))
    // console.log(dado.precoTotalMask)
    $(b).find('#precoTotal').maskMoney('mask', parseFloat(dado.precoTotalMask))
  })
}
function loadRateio(index) {
  $.ajax({
    url: `http://localhost:3000/api/v1/rateio/${index}`,
    method: 'GET',
    success: function (data) {
      if (data != '') {
        data.forEach(function (rat) {
          addModalRow()
          console.log(rat)
          $('#ratRow tr:last').find('input').each(function (a,b) {
            inputId = $(b).attr('id')
            $(b).val(rat[inputId]);
          })
        });
      } else {
        addModalRow()
      }
    },
    error: function (err) {
      console.error('Error loading forms:', err);
    }
  });
}
function createModals(title, body) {
  modal = new bootstrap.Modal($("#mainModal"));
  $("#modalTitle").html(title);
  $("#modalBody").html(body);
  save = $("#modalSave")
    .off("click")
    .on("click", function () {
      modal.toggle();
    });
  modal.toggle();
  return modal;
};
function openModal(arrayInput, inputFieldSelector) {
  body = `<table class="table">
    <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">Centro</th>
      </tr>
    </thead>
    <tbody>`
  // let selectedArray = arrayInput
  arrayInput.forEach((id) => {
    body += `
      <tr data-info='{"name": "${id.name}", "id": ${id.id}}'>
        <th scope="row">${id.id}</th>
        <td>${id.name}</td>
      </tr>`;
  })
  body += `</tbody></table>`;
  let title = $(this).closest("div.col").find("label").html();

  createModals(title, body)

  var selectedItem = null;
  $("#mainModal").find(".table   tbody tr").on("click", function () {
    $("#mainModal").find(".table tbody tr").removeClass("table-active");
    $(this).addClass("table-active");
    selectedItem = JSON.parse($(this).attr("data-info"));
  });

  $("#mainModal").find("#modalSave").on("click", function () {
    if (selectedItem !== "") {
      $(inputFieldSelector).attr('data-info', JSON.stringify(selectedItem))
      $(inputFieldSelector).val(selectedItem.name).trigger('change')
    }
  });
  $("#mainModal").find(".modal-title").text(title);
}
function parseMoney(value) {
  var format = Number(value.replace(/[.]/g, "").replace(",", ".").replace("R$", ""))
  return format
}
function sumPercent() {
  let sum = 0;
  $('.percentageInpt').each(function () {
    let value = parseFloat($(this).val()) || 0;
    sum += value;
  });
  return sum.toFixed(2)
}
function handlePercent() {
  let totalValue = parseMoney($("#valorTotalRat").val())
  let totalSum = sumPercent();
  if (totalSum < 100) {
    let percent = parseFloat($(this).val())
    let result = (percent / 100) * totalValue
    $(this).closest("tr").find(".totalInpt").maskMoney("mask", result)
  } else {
    alert("A soma total da porcentagem não pode exceder os 100%!")
  }
}
function handleAuto() {
  totalValue = parseMoney($("#valorTotalRat").val())
  let sum = sumPercent();
  let magicWand = 100 - sum
  let result = (magicWand / 100 || 0) * totalValue
  let calcVal = result
  if (magicWand > 0) {
    let formatedMagicWand = (magicWand.toFixed(2).toString())
    $(this).closest("tr").find(".percentageInpt").val(formatedMagicWand + " %")
    $(this).closest("tr").find(".totalInpt").maskMoney("mask", calcVal)
  } else {
    alert("Não há porcentagem excedente!")
  }
}
function handleVal() {
  let totalValue = parseMoney($("#valorTotalRat").val())
  let sum = sumPercent();
  if (sum < 100) {
    let part = parseMoney($(this).val())
    let calc = (part / totalValue) * 100
    let percent = calc.toFixed(2)
    $(this).closest("tr").find(".percentageInpt").val(percent + " %")
  } else {
    alert("Não há sobra do valor a ser rateada!")
  }
}
function addModalRow() {
  const modalRow =
    `<tr id='rowIndex' class="rowIndex" data-info=''>
    <td>
       <select class="form-select" aria-label="Default select example">
          <option selected>Selecione Centro</option>
          <option value="1">Centro 1</option>
          <option value="2">Centro 2</option>
          <option value="3">Centro 3</option>
        </select>
    </td>
    <td>
      <input type="hidden" id="prorateId" name="hiddenFieldName" value="">
      <input class="form-control small-input percentageInpt" type="text" name="" id="percentageInpt">
    </td>
    <td>
      <input class="form-control totalInpt" type="text" name="" id="totalInpt">
    </td>
    <td>
      <button id="autoRateio" type="button" class="btn btn-primary autoRateio">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-magic" viewBox="0 0 16 16">
          <path
          d="M9.5 2.672a.5.5 0 1 0 1 0V.843a.5.5 0 0 0-1 0zm4.5.035A.5.5 0 0 0 13.293 2L12 3.293a.5.5 0 1 0 .707.707zM7.293 4A.5.5 0 1 0 8 3.293L6.707 2A.5.5 0 0 0 6 2.707zm-.621 2.5a.5.5 0 1 0 0-1H4.843a.5.5 0 1 0 0 1zm8.485 0a.5.5 0 1 0 0-1h-1.829a.5.5 0 0 0 0 1zM13.293 10A.5.5 0 1 0 14 9.293L12.707 8a.5.5 0 1 0-.707.707zM9.5 11.157a.5.5 0 0 0 1 0V9.328a.5.5 0 0 0-1 0zm1.854-5.097a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L8.646 5.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0l1.293-1.293Zm-3 3a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L.646 13.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0z" />
        </svg>
      </button>
    </td>
    <td> 
      <button id="deleteBtn" type="button" class="btn btn-danger">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 1 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>
    </td>
  </tr>`
  $("#ratRow").append(modalRow)
  $("#ratRow tr:last").find(".totalInpt").maskMoney({ prefix: 'R$ ', thousands: '.', decimal: ',', affixesStay: true })
  $("#ratRow tr:last").find(".percentageInpt").maskMoney({ suffix: ' %', decimal: '.', affixesStay: true })
}
const bodyRat =
  ` <div id="corpoDiv" class="container-fluid">
    <div class="row pb-2 ps-2">
      <div class="col-md-6">
      <input type="hidden" id="dataTransactionIdRat" name="hiddenFieldName" value="">
        <label for="valorTotalRat">Valor Total:</label>
        <input id="valorTotalRat" data-thousands="." data-decimal="," data-prefix="R$ " class="form-control small-input" type="text">
      </div>
      <div class="col-md-auto">
        <button id="addRow" type="button" class="btn btn-primary ml-auto">ADICIONAR</button>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Centro</th>
          <th scope="col">Percentagem</th>
          <th scope="col">Valor Rateado</th>
          <th scope="col">Auto</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody id="ratRow">

      </tbody>
    </table>
  </div>`

function modalRat(totalValue, ultimaLinha) {
  // loadRateio()

  $("#valorTotalRat").maskMoney()
  $("#bodyRat").html(bodyRat)
  var modalRateio = new bootstrap.Modal($("#modalRat"));


  // addModalRow()
  modalRateio.toggle();

  $('#addRow').on("click", function () {
    addModalRow()
  })

  data = ultimaLinha.find("#ratButton").attr("data-info")
  if (data != 0 ) {
    data = JSON.parse(data)
    data.forEach(function () {
      addModalRow()
    })
    $('#ratRow #rowIndex').each(function(index, item){

      // console.log(data[index].percentageInpt)
      $(item).find('#prorateId').val(data[index].prorateId)
      $(item).find('#percentageInpt').maskMoney('mask', parseFloat(data[index].percentageInpt))
      $(item).find('#totalInpt').maskMoney('mask', parseFloat(data[index].totalInpt))
        // console.log(data)
      })
   
  } else {
    addModalRow()
  }

  $("#ratRow").on("change", ".percentageInpt", handlePercent)

  $("#ratRow").on("click", ".autoRateio", handleAuto)

  $("#ratRow").on("change", ".totalInpt", handleVal)

  $('#ratRow').on("click", "#dropBtn", function () {
    $('.dropdown-item').click(function () {
      var selectedText = $(this).text().trim();
      $(this).closest("div").find("#dropBtn").text(selectedText);
    })
  });
  $("#ratRow").on("click", "#deleteBtn", function () {
    saveIndexRateioForDelete($(this).closest("tr").find('#prorateId').val())
    // delProrateById(($(this).closest("tr").find('#prorateId').val()))
    $(this).closest("tr").remove()
    saveInArray()
  })

  $("#modalRat #modalSaveRat").off('click').on("click", function () {
   saveInArray()
   modalRateio.toggle()
  })
  $("#modalRat #modalClose").off('click').on("click", function () {
    modalRateio.toggle()
   })
  
  function saveInArray() {
    let dataRat = [
    ]
    $('#ratRow #rowIndex').each(function () {
      let ratObj = {}
      $(this).find('input').each(function () {
        let inputVal = Number($(this).val().replace('R$ ','').replaceAll('.','').replace(',','.').replace('%',''))
        let inputId = $(this).attr('id')
        ratObj[inputId] = inputVal
      })
      dataRat.push(ratObj)
    })
    ultimaLinha.find("#ratButton").attr('data-info', JSON.stringify(dataRat))
  }
  // console.log(parseFloat(totalValue))


  
  $("#modalRat #valorTotalRat").maskMoney({ prefix: 'R$ ', thousands: '.', decimal: ',', affixesStay: true })
  $("#modalRat #valorTotalRat").maskMoney('mask', parseFloat(totalValue))

  return modalRateio;
};

function removeTransaction(x) {
  $.ajax({
    url: `http://localhost:3000/api/v1/transacao/${x}`, 
    method: 'DELETE',
    contentType: 'application/json',
    success: function(response) {
      console.log('Transacao deletada com sucesso successfully:', response);
    },
    error: function(err) {
      console.error('Error updating forms:', err);
    }
  })
}
let arrayIndexRemoveRateio = []
function saveIndexRateioForDelete(x) {
  if(arrayIndexRemoveRateio === null){
    console.log("nenhum rateio a ser deletado")
  } else {
    console.log("o rateio de ID: ", x, " será deletado ao salvar!")
    arrayIndexRemoveRateio.push(Number(x))
    // console.log(arrayIndexRemoveRateio)
    
  }
}
function callDaCallRateioById() {
  if(arrayIndexRemoveRateio.length > 0) {
    arrayIndexRemoveRateio.forEach(function(a,b){
      delProrateById(a)

    })
  }
}


let arrayIndexTransactionRemove = []
function saveFormIndexForDelete(x) {
  if (x === null) {
    // console.log("nenhum form a ser deletado")
  } else {
    console.log("a transação de ID: ", x, " será deletada ao salvar!")
    arrayIndexTransactionRemove.push(Number(x))
  }
}
function callDaCallTransactionById() {
  if (arrayIndexTransactionRemove.length > 0)
    arrayIndexTransactionRemove.forEach(function(a,b){
      removeTransaction(a)
    })
    // console.log(arrayIndexTransactionRemove)
}
function bindEvents(ultimaLinha) {

  ultimaLinha.find('#deleteFormBtn').on('click', function(a, b){
    let delIndex = ultimaLinha.find('#dataTransactionId').val()
    if (delIndex === '') {
      $(this).closest(".container").remove()
    } else {
      // console.log(delIndex)
      saveFormIndexForDelete(delIndex)
      // removeTransaction(delIndex)
      $(this).closest(".container").remove()
    }

  })

  ultimaLinha.find("#prodButton").on("click", function () {
    getProd()
      .then((data) => {  //recebe e resolve a promisse na func na api, passa o obj como param pro openmodal
        console.log("Data received:", data);
        openModal(data, ultimaLinha.find('#produto'))
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
    
  });


  ultimaLinha.find('#custoButton').on('click', function () {
    getCusto()
      .then((data) => {
        console.log("Data received:", data);
        openModal(data, ultimaLinha.find('#centroCusto'))
      })
    $('#centroCusto').on('change', function () {
      ultimaLinha.find("#grupoServico, #grupoOrcamentario").val("")
    })
   
  })

  ultimaLinha.find('#grupoProdButton').on('click', function () {
    ultimaLinha.find("#grupoOrcamentario").val("")
    let lastSelect = JSON.parse(ultimaLinha.find("#centroCusto").attr("data-info"))
    if (lastSelect.id === null) {
      alert("Você precisa selecionar o Centro de Custo antes!")
    } else {
      getGrupoServico(lastSelect.id)
      .then((data) => {  //recebe e resolve a promisse na func na api, passa o obj como param pro openmodal
        console.log("Data received:", data);
        openModal(data, ultimaLinha.find('#grupoServico'))
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
    }

  })

  ultimaLinha.find('#grupoOrcButton').on('click', function () {
    let lastSelect = JSON.parse(ultimaLinha.find('#grupoServico').attr("data-info"))
    if (lastSelect.id === null) {
      alert("Você precisa selecionar o Grupo de Serviço antes!")
    } else {
      getGrupoOrc(lastSelect.id)
    .then((data) => { 
      console.log("Data received:", data);
      openModal(data, ultimaLinha.find('#grupoOrcamentario'))
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
    }
    

  })

  ultimaLinha.find("#quantidade, #precoUnitario").on("change", () => {
    calculoUnidade(ultimaLinha);
  });



  ultimaLinha.find("#ratButton").on("click", function () {
    
    
    totalValue = ultimaLinha.find("#precoTotal").maskMoney('unmasked')[0]

    modalRat(totalValue, ultimaLinha);

  })
};


function calculoUnidade(ultimaLinha) {
  var unidade = Number(ultimaLinha.find("#quantidade").val());
  var precoUnidade = ultimaLinha.find('#precoUnitario').maskMoney('unmasked')[0]

  var precoTotal = unidade * precoUnidade;
  console.log()
  ultimaLinha.find('#precoTotal').maskMoney('mask', precoTotal)

};

function apiCallTesTProrate(data) {
  $.ajax({
    url: 'http://localhost:3000/api/v1/rateio/',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function (response) {
      console.log('Forms updated successfully:', response);
    },
    error: function (err) {
      console.error('Error updating forms:', err);
    }
  });
}
function apiCallTesT(data) {
  $.ajax({
    url: 'http://localhost:3000/api/v1/rateio/', // Replace with your API endpoint
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function(response) {
      console.log('Forms updated successfully:', response);
    },
    error: function(err) {
      console.error('Error updating forms:', err);
    }
  });
}

function saveForm() {

  $("#mainDiv div.container").each(function(a,b){
    const transaction = $(b).find('#dataTransactionId').val()
    if (transaction === '') {
      const nature = $(b).find("#natureza").val();
      const unity = $(b).find("#unidade").val();
      const quantity = Number($(b).find("#quantidade").val());
      const unity_price = Number(
        $(b)
          .find("#precoUnitario")
          .val()
          .replace("R$ ", "")
          .replaceAll(".", "")
          .replace(",", ".")
      );
      const total_price = Number(
        $(b)
          .find("#precoTotal")
          .val()
          .replace("R$", "")
          .replaceAll(".", "")
          .replace(",", ".")
      );
      const contabil_classification = $(b).find("#classificacao").val();
      const product_id = JSON.parse($(b).find("#produto").attr("data-info")) || 0;
      const costcenter_id = JSON.parse(
        $(b).find("#centroCusto").attr("data-info")
      );
      const servicegroup_id = JSON.parse(
        $(b).find("#grupoServico").attr("data-info")
      );
      const budgetgroup_id = JSON.parse(
        $(b).find("#grupoOrcamentario").attr("data-info")
      );
      let obj = {
        nature: nature,
        unity: unity,
        quantity: quantity,
        unity_price: unity_price,
        total_price: total_price,
        contabil_classification: contabil_classification,
        product_id: product_id.id,
        costcenter_id: costcenter_id.id,
        servicegroup_id: servicegroup_id.id,
        budgetgroup_id: budgetgroup_id.id,
        prorate: [],
      };
      let rateio = JSON.parse($(b).find("#ratButton").attr("data-info"));
      // console.log(rateio);
      if (Array.isArray(rateio)) {
        obj.prorate.push(...rateio);
      } else {
        obj.prorate.push(rateio);
      }
      // console.log(obj)
      insertTransaction(obj)
      // console.log(obj)
    } else {
      let rateio2 =  JSON.parse($(b).find('#ratButton').attr('data-info'))
      let objUpdate = {
        nature: $(b).find('#natureza').val(),
        unity: $(b).find('#unidade').val(),
        quantity: $(b).find('#quantidade').val(),
        unity_price: $(b).find('#precoUnitario').maskMoney('unmasked')[0],
        total_price: $(b).find('#precoTotal').maskMoney('unmasked')[0],
        contabil_classification: $(b).find('#classificacao').val(),
        product_id: JSON.parse($(b).find("#produto").attr("data-info")).id,
        costcenter_id: JSON.parse(
          $(b).find("#centroCusto").attr("data-info")).id,
        servicegroup_id: JSON.parse(
          $(b).find("#grupoServico").attr("data-info")).id,
        budgetgroup_id: JSON.parse(
          $(b).find("#grupoOrcamentario").attr("data-info")).id,
        transactionId: transaction
      };
      updateTransaction(objUpdate)
      rateio2.forEach(function(a,b){
        if (a.prorateId === 0){
          addRat(transaction, a)
          // console.log(a)
          // console.log(transaction)
        } else {
          // console.log(a)
          updateRateio(a)
        }
      })


    }
    
  })
}

function maskCreate () {
  $(".precoUnitario").maskMoney();
  $(".precoTotal").maskMoney();
}
$(document).ready(async function () {

  await loadForms()

  // autoLoadForm()


  $("#addButton").on("click", function (ultimaLinha) {
    bindEvents(createForm(ultimaLinha));
  });
  
  
  $("#saveButton").on("click", function (ultimaLinha) {
    saveForm(ultimaLinha)
    callDaCallTransactionById()
    callDaCallRateioById()
  });

  // getFormById()
})