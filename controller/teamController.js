const { User, Bet, Deposit, Withdrawal, Upi, Other, RandomPercentage } = require('../modals/userModal');

module.exports.getteam = (req, res) => {
    res.render('team')
}


module.exports.get_members_data = async function get_members_data(req,res) {
  
        let data = {};
        const INVITATION_CODE = req.session.inv;
    
          let direct_members = await User.find(
            {parent : INVITATION_CODE},
            {_id : 0 , user : 1 , members : 1 , Ammount : 1 ,  Withdrawals : 1 , withdrawalAmmount : 1   , betPlayed : 1 , inv : 1 , deposit : 1 , profit : 1}
          );
          let level2_user = [];
          let level3_user = [];
          let level4_user = [];
          let level5_user = [];
          let level6_user = [];
    
    
          for(let i = 0 ; i< direct_members.length; i++){
    
           let level2 =   await User.find(
              {parent : direct_members[i].inv},
              {_id : 0 , user : 1,  phone : 1,   RebadeBonus : 1, members : 1 , Ammount : 1 , Withdrawals : 1 , withdrawalAmmount : 1 , betPlayed : 1 ,  inv : 1, deposit : 1 , profit : 1 , }
            );
            level2_user.push(level2);
    
            for(let j = 0 ; j < level2.length; j++){
              let level3 =  await User.find(
                 {parent : level2[j].inv},
                 {_id : 0 , user : 1 , phone : 1  ,  RebadeBonus : 1, members : 1 , Ammount : 1 , Withdrawals : 1 , withdrawalAmmount : 1  , betPlayed : 1 ,  inv : 1, deposit : 1 , profit : 1}
               );
               level3_user.push(level3);
               
               for(let j = 0 ; j < level3.length; j++){
                 let level4 =  await User.find(
                 {parent : level3[j].inv},
                 {_id : 0 , user : 1 , phone : 1  ,  RebadeBonus : 1, members : 1 , Ammount : 1 , Withdrawals : 1 , withdrawalAmmount : 1  , betPlayed : 1 ,  inv : 1, deposit : 1 , profit : 1}
                );
                 level4_user.push(level4);
                 
                 for(let j = 0 ; j < level4.length; j++){
                   let level5 =  await User.find(
                    {parent : level4[j].inv},
                    {_id : 0 , user : 1 , phone : 1  ,  RebadeBonus : 1, members : 1 , Ammount : 1 , Withdrawals : 1 , withdrawalAmmount : 1  , betPlayed : 1 ,  inv : 1, deposit : 1 , profit : 1}
                  );
                  level5_user.push(level5);
                  for(let j = 0 ; j < level5.length; j++){
                     let level6 =  await User.find(
                     {parent : level5[j].inv},
                     {_id : 0 , user : 1 , phone : 1 , members : 1 , Ammount : 1 , Withdrawals : 1 , withdrawalAmmount : 1  , betPlayed : 1 ,  inv : 1, deposit : 1 , profit : 1}
                     );
                     level6_user.push(level6);
                     }
                 }
              }
            }
    
          }
    
          data  = {status : 1 ,direct_members ,  level2_user , level3_user , level4_user , level5_user , level6_user};
          
          return res.send(data);
    
      
};
