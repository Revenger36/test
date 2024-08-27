const pool = require('../../db')
const queries = require('./queries')



const getRateio = (req, res) => {
    pool.query(queries.getRateio, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const transformedData = results.rows.map(row => ({
            percentageInpt: row.percent,
            totalInpt: row.total,
        }));

        res.status(200).json(transformedData); 

    })
    
};

const getRateioById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getRateioById, [id], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const transformedData = results.rows.map(row => ({
            percentageInpt: row.percent,
            totalInpt: row.total,

        }));

        res.status(200).json(transformedData); 

    })
    
};

// const getRateioById = (req, res) => {
//     const id = parseInt(req.params.id)
//     pool.query(queries.getRateioById, [id], (error, results) => {
//         if (error) throw error;
//         res.status(200).json(results.rows);
//     })
// }

// const addRateio = (req, res) => {
//     const {transaction_id, percent, total} = req.body;
//     pool.query(queries.addRateio, [transaction_id, percent, total], (error, results) => {
//         res.status(201).send("rateio adicionado.")
//     })
// }

// const addRateio = (req, res) => {
//     const { transaction_id, percent, total } = req.body;

//     if (typeof transaction_id !== 'number' || typeof percent !== 'number' || typeof total !== 'number') {
//         return res.status(400).send("Invalid input data.");
//     }

//     pool.query(queries.addRateio, [transaction_id, percent, total], (error, results) => {
//         if (error) {
//             console.error('Error executing query', error);
//             return res.status(500).send("Error adding rateio.");
//         }
//         res.status(201).send("Rateio added successfully.");
//     });
// }
const addRateio = (req, res) => {
    // Expecting a single object, not an array
    const { transactionId, rat } = req.body;

    // Validate the payload
    if (typeof transactionId !== 'number' || !Array.isArray(rat)) {
        return res.status(400).send("Invalid input data.");
    }

    // Connect to the database
    pool.connect((err, client, release) => {
        if (err) {
            console.error('Error acquiring client', err.stack);
            return res.status(500).send("Error connecting to the database.");
        }

        client.query('BEGIN', (err) => {
            if (err) {
                release();
                console.error('Error starting transaction', err.stack);
                return res.status(500).send("Error starting transaction.");
            }

            // Prepare and execute insert queries
            const insertPromises = rat.map(entry => {
                const { percentageInpt, totalInpt } = entry;
                return client.query('INSERT INTO prorate (transaction_id, percent, total) VALUES ($1, $2, $3);', [transactionId, percentageInpt, totalInpt]);
            });

            // Execute all queries
            Promise.all(insertPromises)
                .then(() => {
                    client.query('COMMIT', (err) => {
                        if (err) {
                            console.error('Error committing transaction', err.stack);
                            client.query('ROLLBACK', (rollbackErr) => {
                                release();
                                if (rollbackErr) {
                                    console.error('Error rolling back transaction', rollbackErr.stack);
                                }
                                return res.status(500).send("Error committing transaction.");
                            });
                        } else {
                            release();
                            res.status(201).send("Rateios added successfully.");
                        }
                    });
                })
                .catch(error => {
                    client.query('ROLLBACK', (rollbackErr) => {
                        release();
                        if (rollbackErr) {
                            console.error('Error rolling back transaction', rollbackErr.stack);
                        }
                        console.error('Error executing queries', error.stack);
                        res.status(500).send("Error adding rateios.");
                    });
                });
        });
    });
}




// const updateRateio = (req, res) => {
//     const id = parseInt(req.params.id)
//     const {center, percent, total} = req.body;
//     pool.query(queries.updateRateio, [id, center, percent, total], (error, results) => {
//         if (error) throw error;
//         res.status(200).send("Produto atualizado")
//     })
// }

const addProd = (req, res) => {
    const {produto, natureza, unidade, quantidade, preco_unitario, preco_total, classificacao, centro_custo, grupo_servico, grupo_orcamentario} = req.body;
    pool.query(queries.addProd, [produto, natureza, unidade, quantidade, preco_unitario, preco_total, classificacao, centro_custo, grupo_servico, grupo_orcamentario], (error, results) => {
        res.status(201).send("produtos adicionado.")
    })
}

const getProd = (req, res) => {
    pool.query(queries.getProd, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results.rows);
    });
};

const getCostCenter = (req, res) => {
  pool.query(queries.getCostCenter, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json(results.rows);
  });
};

const getServiceGroup = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getServiceGroupById, [id], (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(200).json(results.rows);
    });
  };



// const addTransaction = (req, res) => {
//     const {data_transaction_id, produto, natureza, unidade, quantidade, preco_unitario, preco_total, classificacao, centro_custo, grupo_servico, grupo_orcamentario} = req.body
//     pool.query(queries.addTransaction, [data_transaction_id, produto, natureza, unidade, quantidade, preco_unitario, preco_total, classificacao, centro_custo, grupo_servico, grupo_orcamentario], (error, results) => {
//         res.status(201).send("transacao adicionada.")
//     });
// }

// const addTransaction = (req, res) => {
//     const {
//         data_transaction_id, // Field to be ignored
//         product_id,
//         natureza,
//         unidade,
//         quantidade,
//         preco_unitario,
//         preco_total,
//         classificacao,
//         centro_custo,
//         grupo_servico,
//         grupo_orcamentario
//     } = req.body;

//     pool.query(queries.addTransaction, [
//             product_id,
//             natureza,
//             unidade,
//             quantidade,
//             preco_unitario,
//             preco_total,
//             classificacao,
//             centro_custo,
//             grupo_servico,
//             grupo_orcamentario
        
//     ], (error, results) => {
//         if (error) {
//             console.error('Error executing query:', error);
//             return res.status(500).send("Internal Server Error");
//         }
//         res.status(201).send("Transaction added.");
//     });
// };

const addTransaction = async (req, res) => {
    const data = req.body;
    const values = [
        data.nature,
        data.unity,
        data.quantity,
        data.unity_price,
        data.total_price,
        data.contabil_classification,
        data.product_id,
        data.costcenter_id,
        data.servicegroup_id,
        data.budgetgroup_id
    ];

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Insert transaction and get its ID
        const result = await client.query(queries.addTransaction, values);
        const transactionId = result.rows[0].id;
        console.log(transactionId)

        // throw new Error("Deu ruim glr")
        const prorateRecords = data.prorate; 

        for (const prorate of prorateRecords) {
            await client.query(queries.addProrate, [
                transactionId,
                prorate.percentageInpt,
                prorate.totalInpt
            ]);
        }

        await client.query('COMMIT');
        res.status(200).json({ message: "Transaction and prorates added successfully" });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Error executing query:", error);
        res.status(500).json({ error: "An error occurred while adding transaction and prorates" });
    } finally {
        client.release();
    }
};


// const addTransaction = async (req, res) => {
//     const data = req.body;

//     const values = [
//         data.nature,
//         data.unity,
//         data.quantity,
//         data.unity_price,
//         data.total_price,
//         data.contabil_classification,
//         data.product_id,
//         data.costcenter_id,
//         data.servicegroup_id,
//         data.budgetgroup_id
//     ];

//     pool.query(queries.addTransaction, values, (error, results) => {
//         if (error) {
//             console.error("Error executing query:", error);
//             return res.status(500).json({ error: "deu ruim" });
//         }
//         res.status(200).json({ message: "deu bom", data: results });
//     });
// };


const getProdById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getProdById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getBudgetById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getBudgetById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const updateProd = (req, res) => {
    const id = parseInt(req.params.id)
    const {name, quantity, value, total_value} = req.body;
    pool.query(queries.updateProd, [id, name, quantity, value, total_value], (error, results) => {
        if (error) throw error;
        res.status(200).send("Produto atualizado")
    })
}

const getTransaction = (req, res) => {
    pool.query(queries.getTransaction, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        const transformedData = results.rows.reduce((acc, row) => {
            const key = JSON.stringify({
                transaction_id: row.transaction_id,
                product_id: row.product_id,
                costcenter_id: row.costcenter_id,
                servicegroup_id: row.servicegroup_id,
                budgetgroup_id: row.budgetgroup_id,
                product_name: row.product_name,
                nature: row.nature,
                unity: row.unity,
                quantity: row.quantity,
                unity_price: row.unity_price,
                total_price: row.total_price,
                contabil_classification: row.contabil_classification,
                cost_center_name: row.cost_center_name,
                service_group_name: row.service_group_name,
                budget_group_name: row.budget_group_name
            });

            if (!acc[key]) {
                acc[key] = {
                    dataTransactionId: row.transaction_id,
                    produto: row.product_name,
                    natureza: row.nature,
                    unidade: row.unity,
                    quantidade: row.quantity,
                    precoUnitarioMask: row.unity_price,
                    precoTotalMask: row.total_price,
                    classificacao: row.contabil_classification,
                    centroCusto: row.cost_center_name,
                    grupoServico: row.service_group_name,
                    grupoOrcamentario: row.budget_group_name,
                    prorates: [],
                    costcenterId: row.costcenter_id,
                    servicegroupId: row.servicegroup_id,
                    budgetgroupId: row.budgetgroup_id,
                    productId: row.product_id
                };
            }

            if (row.prorate_id) {
                acc[key].prorates.push({
                    prorateId: row.prorate_id,
                    percentageInpt: row.prorate_percent,
                    totalInpt: row.prorate_total
                });
            }

            return acc;
        }, {});

        const finalResult = Object.values(transformedData);

        res.status(200).json(finalResult);
    });
};

const updateProrate = async (req, res) => {
    const data = req.body;
    const values = [
        data.percentageInpt,
        data.totalInpt,
        data.prorateId
    ]
    try {
        await pool.query(queries.updateProrate, values);
        res.status(200).send("Prorate update!")
    } catch (error) {
        console.error('query deu ruim:', error);
        res.status(500).json({ error: 'erro no servidor.'})
    }
}

const updateTransaction = async (req, res) => {
    const data = req.body;
    const values = [
        data.nature,
        data.unity,
        data.quantity,
        data.unity_price,
        data.total_price,
        data.contabil_classification,
        data.product_id,
        data.costcenter_id,
        data.servicegroup_id,
        data.budgetgroup_id,
        data.transactionId
    ];
    try {
        await pool.query(queries.updateTransaction, values);
        res.status(200).send("Transaction updated successfully.");
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const addProrateById = async (req, res) => {
    const id = parseInt(req.params.id)
    const data = req.body;
    const values = [
        id,
        data.percentageInpt,
        data.totalInpt
    ];
    try {
        await pool.query(queries.addProrate2, values);
        res.status(200).send("prorate updated successfully.");
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteProrateById = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        await pool.query(queries.deleteProrateById, [id]);
        res.status(200).send("prorate deleted successfully.");
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteTransactionById = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        await pool.query(queries.deleteTransactionById, [id]);
        res.status(200).send("transaction deleted successfully.");
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    deleteTransactionById,
    deleteProrateById,
    addProrateById,
    updateProrate,
    updateTransaction,
    getBudgetById,
    getServiceGroup,
    getCostCenter,
    getRateio,
    getRateioById,
    addRateio,
    // updateRateio,
    getProd,
    getProdById,
    addProd,
    updateProd,
    getTransaction,
    // addProrateById,
    // getTransactionById,
    addTransaction,
    // updateTransaction,
}