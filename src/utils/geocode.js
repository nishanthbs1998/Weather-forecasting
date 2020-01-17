const geocode=(address,callback)=>{
    const request=require(`request`)
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/`+ 
    encodeURIComponent(address) +`.json?access_token=pk.eyJ1IjoibmlzaGFudGhicyIsImEiOiJjazUyaGFmdjMwZTlyM2twOHlkYWV0a2JnIn0.rM7mQ9MOA08qCgkKTld31w&limit=1`
    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            callback(`Unable to connect to the network. Please try again later.`,undefined)
        }
        else if(response.body.features.length===0)
        {
            callback(`Address does not exist. Please enter a valid address`,undefined)
        }
        else
        {
            callback(undefined,data={
                Latitude: response.body.features[0].center[1],
                Longitude: response.body.features[0].center[0],
                Location: response.body.features[0].place_name
            })
        }
    })
}
module.exports=geocode