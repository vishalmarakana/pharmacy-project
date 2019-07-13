import RequestHandler from '../../RequestHandler'

export default class GetOrders extends RequestHandler{

    handle(req: any, res: any): void {
            const {date,limit}=req.body;
            let lim=parseInt(limit,10);
            if(!lim)lim=100;

            let query=`select * from Orders where DATE>? limit ?`
            console.log(query);
            this.pool.query(query,[date,lim]).then((result:any)=>res.json({List:result}))
    }

}