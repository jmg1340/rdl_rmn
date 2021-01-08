
var opcions = 
{
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // don't delete database entries but set the newly added attribute deletedAt
  // to the current date (when deletion was done). paranoid will only work if
  // timestamps are enabled
  paranoid: false,

  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true,

  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,

  // define the table's name
  //tableName: 'my_very_custom_table_name'	
}





module.exports = function(sequelize,DataTypes){
	return sequelize.define(
		'activitat',
		{
			codiAct:
			{
				type: 	DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta codiAct"
					}
				}
			},
			
			data:
			{
				type: 	DataTypes.DATEONLY,
				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta data"
					}
				}
			},
			

			procedencia:
			{
				type: 	DataTypes.STRING,
				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta procedencia"
					}
				}
			},
			
			
			pacient:
			{
				type: 	DataTypes.STRING,
				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta pacient"
					}
				}
			},
			
			
			proces:
			{
				type: 	DataTypes.STRING,
				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta proces"
					}
				}
			},
			
			
			prova:
			{
				type: 	DataTypes.STRING,
				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta prova"
					}
				}
			},
			
			
			modalitat:
			{
				type: 	DataTypes.STRING,
				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta modalitat"
					}
				}
			},
			
			
			contrast:
			{
				type: 	DataTypes.STRING,
				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta Contrast"
					}
				}
			},
			
			
			realitzador:
			{
				//type: 	DataTypes.INTEGER,
				type: 	DataTypes.STRING,
				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta realitzador"
					}
				}
			}


			// El camp "registre" el creo en el mateix MySQL (a traves del script) ja que pel que he vist
			// per internet sembla que no existeix DataTypes.TIMESTAMP

		},
		opcions
	);
}