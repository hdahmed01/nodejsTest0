const express=require("express");
const mongoose=require("mongoose")

const app=express()

const Article=require("./models/Article")


mongoose.connect("mongodb+srv://ahmed:21503940@cluster0.mxjqx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("i have connected to the database successfully")
}).catch((error)=>{
    console.log("error while connection to the database",error)
})


app.use(express.json())
app.get("/hello",(req,res)=>{
    res.send("hello it's me ")
})

app.get("/hi",(req,res)=>{
    res.send(" hi it's me")
})

app.put("/test",(req,res)=>{
    res.send(" you visted test ")
})
// path parameters
app.get("/findsummation/:number1/:number2",(req,res)=>{
   const num1=req.params.number1
   const num2=req.params.number2
   
    console.log(req.params)
   const totale=Number(num1)+Number(num2)
    res.send(`the numbers are ${num1} and ${num2} the totale =${totale}`);
})
// body parameters
app.get("/body",(req,res)=>{

    console.log(req.body)
     res.send(`hello ${req.body.name}`);
 })
// query parameters
app.get("/query",(req,res)=>{

    console.log(req.query)
     res.send(`hello ${req.query.age}`);
 })

// json params
 app.get("/joson",(req,res)=>{

    res.json({
        name :req.body.name,
        age :req.query.age,
    })
    
 })
// sending a html file
 app.get("/html",(req,res)=>{
   
   res.sendFile(__dirname+"/views/numbers.html")
    
 })
 // rendering ejs file
 app.get("/ejs",(req,res)=>{
    let number=0;
    for(let i=0;i<=100 ;i++) {
        number+=i;
    }
    // res.send(`sum =${number}`)
    res.render("numbers.ejs",{
        name:"ahmed",
        num:number
    })  
 })
//  post ARTICALE ENDPOINT
app.post("/articles",async(req,res)=>{
    const newArticle =new Article()
    
    newArticle.title=req.body.articleTitle;
    newArticle.body=req.body.articleBody;
    newArticle.numberOfLikes=100;
    await newArticle.save();
    await res.json(newArticle)

})
// get ARTICLES
app.get("/articles",async(req,res)=>{
    const articles=await Article.find()
    // console.log("the article are",articles)
    await res.json(articles);
})
// get ARTICLE BY ID
app.get("/articles/:id",async(req,res)=>{
    const id=req.params.id;
    const articles=await Article.findById(id)
    console.log("ahmed article is ",articles)
    await res.json(articles);
})
// delete with id
app.delete("/articles/:id",async(req,res)=>{
    try{    
        const article=await Article.findByIdAndDelete(req.params.id);
        res.json(article);
        return;
    }catch(error){
        return res.send(error);
    }
})

app.get("/",async (req,res)=>{
    const articles= await Article.find();
    
    res.render("articles.ejs",{
        articles :articles
    })
    
})
app.get("/1", (req,res)=>{
  res.send(" hello in my page")  
})
    


 app.listen(3000, ()=>{
    console.log("i m listening in  port 3000");
 } )
