import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Loan } from "@/utils/mockData"
import { calculateEMI, calculateTotalRepayment } from "@/utils/loanCalculations"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

interface LoanCardProps {
  loan: Loan
  amount: number
}

export function LoanCard({ loan, amount }: LoanCardProps) {
  const emi = calculateEMI(amount, loan.interestRate, loan.tenure)
  const totalRepayment = calculateTotalRepayment(emi, loan.tenure)

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex justify-between items-center">
          <span>{loan.institution}</span>
          <Badge variant="secondary">{loan.type} Loan</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-sm font-medium">Interest Rate</span>
              <span className="text-2xl font-bold text-primary block">{loan.interestRate}%</span>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-medium">Tenure</span>
              <span className="text-2xl font-bold block">{loan.tenure} months</span>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-medium">Monthly EMI</span>
              <span className="text-2xl font-bold block">${emi.toFixed(2)}</span>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-medium">Total Repayment</span>
              <span className="text-2xl font-bold block">${totalRepayment.toFixed(2)}</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-sm font-medium">Processing Fee</span>
            <span className="text-xl font-bold block">{loan.processingFee}%</span>
          </div>
          <div>
            <span className="text-sm font-medium">Features</span>
            <ul className="mt-2 space-y-1">
              {loan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

