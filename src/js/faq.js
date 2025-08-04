// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-item__question');
    const icon = item.querySelector('.faq-item__icon');
    
    // Create answer element
    const answer = document.createElement('div');
    answer.className = 'faq-item__answer';
    answer.style.display = 'none';
    answer.style.overflow = 'hidden';
    answer.style.transition = 'all 0.3s ease';
    
    // Add sample answer content (you can replace with real content)
    const questionText = question.textContent.trim();
    answer.innerHTML = getAnswerContent(questionText);
    
    // Insert answer after the question
    item.appendChild(answer);
    
    // Add click event
    item.addEventListener('click', function() {
      const isOpen = item.classList.contains('faq-item--open');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('faq-item--open');
          const otherAnswer = otherItem.querySelector('.faq-item__answer');
          const otherIcon = otherItem.querySelector('.faq-item__icon');
          
          otherAnswer.style.display = 'none';
          otherIcon.style.transform = 'rotate(0deg)';
        }
      });
      
      // Toggle current item
      if (isOpen) {
        item.classList.remove('faq-item--open');
        answer.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
      } else {
        item.classList.add('faq-item--open');
        answer.style.display = 'block';
        icon.style.transform = 'rotate(180deg)';
      }
    });
  });
});

// Function to get answer content based on question
function getAnswerContent(question) {
  const answers = {
    'What is FreeBMD and what records does it contain?': 
      '<p>FreeBMD is a free database containing transcribed records of births, marriages, and deaths in England and Wales from 1837 onwards. It includes over 297 million records that have been transcribed by volunteers.</p>',
    
    'How do I search effectively?': 
      '<p>Start with broad searches using just surnames and approximate dates, then narrow down with additional information. Try different spellings and be flexible with dates. Use the registration district field if you know the location.</p>',
    
    'What time periods and locations are covered?': 
      '<p>FreeBMD covers England and Wales from 1837 (when civil registration began) to 1999. Coverage varies by year and region, with some periods more complete than others. Scotland and Ireland have separate systems.</p>',
    
    'How do marriage records work?': 
      '<p>Marriage records show both spouses\' names, ages, occupations, and addresses. They also include fathers\' names and occupations. You can search by either spouse\'s name, and the record will show both individuals.</p>',
    
    'I found a record - what do I do next?': 
      '<p>Record the details including volume and page numbers. Cross-reference with other sources if possible. Use the information to search for related records like births of children or deaths of parents.</p>',
    
    'Does FreeBMD cost anything?': 
      '<p>No, FreeBMD is completely free to use. It\'s run by volunteers and funded by donations. You can search, view, and download records without any cost or registration required.</p>'
  };
  
  return answers[question] || '<p>Answer content will be added soon.</p>';
} 