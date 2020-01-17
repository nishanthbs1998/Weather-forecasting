const express=require(`express`)
const path=require(`path`)
const hbs=require(`hbs`)
const geocode=require(`./utils/geocode.js`)
const forecast=require(`./utils/forecast.js`)

const app=express()
const port=process.env.PORT || 3000
//Define paths for express config
const pathDirectory=path.join(__dirname,`../public`)
const viewPath=path.join(__dirname,`../src/templates/views`)
const partialsPath=path.join(__dirname,`../src/templates/partials`)


//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(pathDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title: `Weather`,
        name: `Nishanth BS`
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: `About the creator`,
        name: `Nishanth BS`
    })
})
app.get(`/help`,(req,res)=>{
    res.render(`help`,{
        
        content:`Content yet to be added`,
        title:`HELP`,
        name:`Nishanth BS`
    })
})

app.get(`/weather`,(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:`Please enter an address`
        })
    }
    geocode(req.query.address,(error,{Latitude,Longitude,Location}={})=>{
        if(error)
            return res.send({error})
        // else if((!Latitude)&& (!Longitude))
        //     return res.send(`Please enter a valid address`) 
            forecast(Latitude,Longitude,(error,forecastData)=>{
                if(error)
                    return res.send({error})
                
                    res.send({
                        forecast:forecastData,
                        Location:Location,
                        
                    })
            })
    })        
   // const value=req.query.address
    
})

app.get(`/products`,(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:`Please enter a search term`
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get(`/help/*`,(req,res)=>{
    res.render(`404-error`,{
        name:`Nishanth`,
        title:`404`,
        error:`Help article not found`
    })
})
app.get(`*`,(req,res)=>{
    res.render(`404-error`,{
        name:`Nishanth`,
        title:`404`,
        error:`Page not found`
    } )
})
app.listen((port),()=>{
    console.log(`Server is running on port `+port)
})


// app.use(`/help`,express.static(pathToHelp))
// app.use(`/about`,express.static(pathToAbout))
// app.get(``,(req,res)=>{
//     res.send(`<h1>Welcome to the home page</h1>`)
// })
// app.get(`/help`,(req,res)=>{
//      res.send({
//     //     name:`Nish`,
//     //     age:22
//     })
// })
// app.get(`/about`,(req,res)=>{
//     res.send(`<h1>About</h1>`)
// })