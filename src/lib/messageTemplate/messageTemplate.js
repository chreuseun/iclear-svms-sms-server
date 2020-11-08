module.exports =  ({ payment_amount, student_name, payment_date }) => {
  return `Hi, DYCI received the payment of ${payment_amount} for ${student_name} this ${payment_date} balance, thank you.`
}