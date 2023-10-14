const { User, Bet, Deposit, Withdrawal, Upi, Other, RandomPercentage } = require('../modals/userModal');

module.exports.getorder = (req, res) => {
    res.render('order');
}
 
module.exports.get_bet_data = async(req,res)=>{
    
        const INVITATION_CODE = req.session.inv;
      // ------------------------------------------result page ------------------------------ 
        let setteled_bets = 
        await Bet.find({inv : INVITATION_CODE , settled : true} , {_id : 0 , team_a : 1 , team_b : 1 , scoreDetails : 1 , final_score : 1 , date : 1 , profit : 1 , time : 1 , league : 1  , bAmmount : 1, leagueId : 1});
        // console.log(setteled_bets + "unsetteled bets");
          
        let unsetteled_bets = 
        await Bet.find({inv : INVITATION_CODE , settled : false} , {_id : 0 , team_a : 1 , team_b : 1 , scoreDetails : 1  , date : 1 , profit : 1 , time : 1 , league : 1 , bAmmount : 1 , leagueId : 1});
        
        // console.log(unsetteled_bets + "unsetteled bets");

        let data = {setteled_bets,unsetteled_bets , status : 1};
    
        return res.send(data);
    
    
}