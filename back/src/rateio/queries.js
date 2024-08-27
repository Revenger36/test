const getTransaction =`SELECT 
    t.id AS transaction_id,
    t.nature,
    t.unity,
    t.quantity,
    t.unity_price,
    t.total_price,
    t.contabil_classification,
    t.product_id,
    t.costcenter_id,
    t.servicegroup_id,
    t.budgetgroup_id,
    p.name AS product_name,
    cc.name AS cost_center_name,
    bg.name AS budget_group_name,
    sg.name AS service_group_name,
    pr.id AS prorate_id,
    pr.percent AS prorate_percent,
    pr.total AS prorate_total
FROM 
    transaction t
LEFT JOIN 
    product p ON t.product_id = p.id
LEFT JOIN 
    cost_center cc ON t.costcenter_id = cc.id
LEFT JOIN 
    budget_group bg ON t.budgetgroup_id = bg.id
LEFT JOIN 
    service_group sg ON t.servicegroup_id = sg.id
LEFT JOIN 
    prorate pr ON pr.transaction_id = t.id

`
const addTransaction =  `
    INSERT INTO transaction (
            nature, unity, quantity, unity_price, total_price, contabil_classification, product_id, costcenter_id, servicegroup_id, budgetgroup_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;`

const addProrate = `
    INSERT INTO prorate (transaction_id, percent, total)
    VALUES ($1, $2, $3)
  `

const addProrate2 = `
  INSERT INTO prorate (transaction_id, percent, total)
  VALUES ($1, $2, $3)
`
const deleteProrateById = "DELETE FROM prorate WHERE id = $1"

const deleteTransactionById = "DELETE FROM transaction WHERE id = $1"

const updateProrate = `
UPDATE prorate
SET percent = $1,
total = $2
WHERE id = $3
`

const updateTransaction = `
UPDATE transaction
SET nature = $1,
unity = $2,
quantity = $3,
unity_price = $4,
total_price = $5,
contabil_classification = $6,
product_id = $7,
costcenter_id = $8,
servicegroup_id = $9,
budgetgroup_id = $10
WHERE id = $11 `

const getCostCenter = "SELECT * FROM cost_center"
const getServiceGroupById = "SELECT * FROM service_group WHERE cost_center_id = $1"
const getBudgetById = "SELECT * FROM budget_group WHERE service_group_id = $1"

const getRateio = "SELECT * FROM prorate;"
const getRateioById = "SELECT * FROM prorate WHERE transaction_id = $1;"
const addRateio = "INSERT INTO prorate (transaction_id, percent, total) VALUES ($1, $2, $3);"
const updateRateio = "UPDATE rateio SET center = $2, percent = $3, total = $4 WHERE rateio_id = $1;"

const addProd = "INSERT INTO product (produto, natureza, unidade, quantidade, preco_unitario, preco_total, classificacao, centro_custo, grupo_servico, grupo_orcamentario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;"
const getProd = "SELECT * FROM product;"
const getProdById = "SELECT * FROM PRODUCT WHERE product_id = $1;"
const updateProd = "UPDATE product SET name = $2, quantity = $3, value = $4, total_value = $5 WHERE product_id = $1"


module.exports = {
    deleteTransactionById,
    deleteProrateById,
    addProrate2,
    updateProrate,
    updateTransaction,
    addProrate,
    getBudgetById,
    getServiceGroupById,
    getCostCenter,
    getRateio,
    getRateioById,
    addRateio,
    updateRateio,
    getProd,
    getProdById,
    addProd,
    updateProd,
    getTransaction,
    // getTransactionById,
    addTransaction,
    // updateTransaction,

}