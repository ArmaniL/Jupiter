package main

import (
	"fmt"
	"time"
	"net/http"
	"os"
	"log"
	"encoding/json"
	"github.com/markcheno/go-quote"
	
	newsapi	"github.com/kaelanb/newsapi-go"
)

var dt time.Time

const key="";
func main() {
	http.HandleFunc("/News/Headline", HeadlineHandler)
	http.HandleFunc("/Stock/Quote", StockHandler)
	http.HandleFunc("/Stock/Quotes", StocksHandler)
	http.HandleFunc("/Currency/Quote",CurrencyHandler)
	http.HandleFunc("/Currency/Quotes",CurrenciesHandler)
	port := os.Getenv("PORT")
        if port == "" {
                port = "8080"
                log.Printf("Defaulting to port %s", port)
        }

        log.Printf("Listening on port %s", port)
        if err := http.ListenAndServe(":"+port, nil); err != nil {
                log.Fatal(err)
        }

}

func getStock(symbol string) string{
	dt = time.Now()
	spy, err := quote.NewQuoteFromYahoo(symbol, dt.AddDate(0, 0, -1).Format("2006-01-02"), dt.Format("2006-01-02"), quote.Daily, true)
	if err== nil{
	return spy.JSON(true)
	}
	log.Fatal(err)
	return " "
}

func getCurrency(symbol string)string{
    dt = time.Now()
	spy, err := quote.NewQuoteFromYahoo(symbol, dt.AddDate(0, 0, -1).Format("2006-01-02"), dt.Format("2006-01-02"), quote.Daily,true)
	if err== nil{
	return spy.JSON(true)
	}
	log.Fatal(err)
	return " "
}

func StockHandler(w http.ResponseWriter, r *http.Request){
	query := r.URL.Query()
	symbol, present := query["SYM"]
	if !present || len(symbol) == 0 {
        fmt.Println("filters not present")
	}
	quote:=getStock(symbol[0])

    fmt.Fprintf(w,quote) 


}

func StocksHandler(w http.ResponseWriter, r *http.Request){
	query := r.URL.Query()
	symbols, present := query["SYM"]
	size:=len(symbols)
	if !present ||  size== 0 {
        fmt.Println("symbols not present")
	
	}else{ 
	
	
	for _,symbol:=range symbols{
		fmt.Fprintf(w,getStock(symbol)) 
	}
	
	}

}


func CurrencyHandler(w http.ResponseWriter, r *http.Request){
	query := r.URL.Query()
	symbol, present := query["SYM"]
	if !present || len(symbol) == 0 {
        fmt.Println("symbols not present")
	}
	quote:=getCurrency(symbol[0])

    fmt.Fprintf(w,quote) 


}

func CurrenciesHandler(w http.ResponseWriter, r *http.Request){
	query := r.URL.Query()
	symbols, present := query["SYM"]
	size:=len(symbols)
	if !present ||  size== 0 {
        fmt.Println("symbols not present")
	
	}else{ 
	
	
	for _,symbol:=range symbols{
		fmt.Fprintf(w,getStock(symbol)) 
	}
	
	}

	

}

func HeadlineHandler(w http.ResponseWriter, r *http.Request){

	client := newsapi.New(key)
	param:= r.URL.Query()
	q, present := param["q"]
	if !present || len(q) == 0 {
        fmt.Println("symbols not present")
	}
	query1 := []string{}
	query1=append(query1,fmt.Sprintf("q=%s",q[0]))
    newsResponse, err := client.GetEverything(query1)
	if err != nil {
		log.Fatal(err)
	}
	if newsResponse.TotalResults>0{
	article := newsResponse.Articles  
	
	values,_:=json.Marshal(article[0])
	fmt.Fprintf(w,string(values)) 
	}else{
		fmt.Fprintf(w,"[]")
	}
}



