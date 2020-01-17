const request=require(`request`)
const forecast=(Latitude,Longitude,callback)=>{
    const url=`https://api.darksky.net/forecast/8d85d7b11244dd51e9a90c93aad6b27e/`+encodeURIComponent(Latitude)+`,`+encodeURIComponent(Longitude)+`?units=si&lang=en`
    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            callback(`Unable to connect to the net.`,undefined)
        }
        else if(response.body.error)
        {
            callback(`Data not found`,undefined)
        }
        else
        {
            callback(undefined,data={
                Summary:response.body.daily.data[0].summary,
                Temperature:response.body.currently.temperature,
                Probability_of_rain:response.body.currently.precipProbability
            })
        }
    })
}
module.exports=forecast