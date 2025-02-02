import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqData = [
  {
    question: "How do I qualify for a loan?",
    answer:
      "Qualifying for a loan typically depends on several factors, including your credit score, income, debt-to-income ratio, and employment history. Lenders will assess these aspects to determine your creditworthiness. Maintaining a good credit score, having a stable income, and keeping your debt levels low can improve your chances of loan approval.",
  },
  {
    question: "What is the difference between fixed and variable interest rates?",
    answer:
      "Fixed interest rates remain constant throughout the loan term, providing predictable monthly payments. Variable interest rates, on the other hand, can fluctuate based on market conditions. While variable rates often start lower, they carry the risk of increasing over time. Fixed rates offer stability, while variable rates might save you money if interest rates decrease.",
  },
  {
    question: "How long does the loan application process take?",
    answer:
      "The loan application process duration can vary depending on the lender and type of loan. Generally, personal loans can be approved within a few days to a week. Mortgage loans typically take longer, often 30-45 days from application to closing. The process includes submitting an application, providing necessary documentation, undergoing a credit check, and final approval.",
  },
  {
    question: "Can I pay off my loan early without penalties?",
    answer:
      "Many lenders allow early loan repayment without penalties, but it's essential to check your loan agreement. Some loans, particularly mortgages or auto loans, may have prepayment penalties. These fees are designed to compensate the lender for lost interest. Before making extra payments or paying off your loan early, review your terms or contact your lender to understand any potential costs.",
  },
  {
    question: "What happens if I miss a loan payment?",
    answer:
      "Missing a loan payment can have several consequences. Initially, you may be charged a late fee. If the payment remains unpaid, it can negatively impact your credit score. Continued missed payments may result in default, potentially leading to legal action or asset seizure in the case of secured loans. It's crucial to communicate with your lender if you're having difficulty making payments, as they may offer options like payment deferment or loan modification.",
  },
]

export function FAQ() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-white">{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}

