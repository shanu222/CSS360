# 🧪 Test Your AI Features

Quick test script to verify OpenAI integration is working.

## Prerequisites

Make sure you have:
1. ✅ MongoDB connected (MONGODB_URI in .env)
2. ✅ OpenAI API key added (OPENAI_API_KEY in .env)
3. ✅ Backend server running on port 5000
4. ✅ At least one user account created

## Test Steps

### 1. Start the App

```powershell
# Terminal 1: Start backend + frontend
npm run dev
```

Wait for both servers to start:
- Backend: http://localhost:5000
- Frontend: http://localhost:5173

### 2. Create Account & Login

1. Open http://localhost:5173
2. Click "Create Account"
3. Register with:
   - Email: test@css360.com
   - Password: Test123!
   - Name: Test User
4. Login automatically after registration

### 3. Test AI Chat

1. Click "AI Assistant" in the sidebar
2. Type: **"Explain Realism in International Relations"**
3. Press Enter or click Send
4. You should see a loading indicator
5. Within 5-10 seconds, GPT-4 will respond with detailed explanation

**Expected Result:**
```
✅ Message appears in chat
✅ Detailed, CSS-focused response
✅ No error messages
```

**If you see an error:**
- "AI service configuration error" → Check OpenAI API key
- "Failed to get AI response" → Check internet connection
- "Authentication failed" → Login again

### 4. Test Essay Outline Generator

1. Click "Practice Center" from sidebar
2. Click "Essay Lab" card
3. Choose any essay topic (e.g., "Democracy in Pakistan")
4. Click "View Outline" button
5. Wait 5-10 seconds

**Expected Result:**
```
✅ Loading spinner appears
✅ Detailed outline generated
✅ Includes Introduction, Body, Conclusion
✅ CSS-specific content
✅ "Start Writing Essay" button appears
```

### 5. Test Essay Evaluation

1. From Practice Center, click "Answer Writing"
2. Paste this sample answer:

```
Constitutional development in Pakistan has been a complex journey marked by several challenges. After independence in 1947, Pakistan struggled to establish a stable democratic framework. The first constitution was not adopted until 1956, nearly nine years after independence. This delay was primarily due to disagreements over the distribution of power between provinces and the center.

The 1956 Constitution was short-lived, as military rule was imposed in 1958. General Ayub Khan's regime introduced the 1962 Constitution, which established a presidential system. However, this too failed to provide lasting stability. Following the 1971 separation of East Pakistan, Prime Minister Zulfikar Ali Bhutto led efforts to create a new constitution.

The 1973 Constitution represents Pakistan's most enduring constitutional document. It established a parliamentary federal system and has, despite several amendments, remained the foundation of Pakistan's legal framework. However, the journey to this point involved numerous military interventions and political instability that continue to affect Pakistan's democratic development.
```

3. Click "Submit for AI Evaluation"
4. Wait 10-15 seconds

**Expected Result:**
```
✅ Loading animation appears
✅ Detailed feedback provided
✅ Analysis of structure, content, style
✅ Specific suggestions for improvement
✅ CSS exam-relevant critique
```

### 6. Test Quick Suggestions (AI Chat)

Try these questions in AI Assistant:

**Quick queries:**
- "What is CPEC?"
- "Summarize Pakistan's foreign policy"
- "How to write a good CSS essay?"
- "Explain the Kashmir conflict"

**Each should:**
- ✅ Respond in 5-10 seconds
- ✅ Give CSS-focused answers
- ✅ Include relevant examples
- ✅ Provide exam tips

## 🔍 Manual API Testing (Optional)

If you want to test the backend directly:

### Get JWT Token

```powershell
# Login and get token
$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body (@{
  email = "test@css360.com"
  password = "Test123!"
} | ConvertTo-Json) -ContentType "application/json"

$token = $response.token
Write-Host "Token: $token"
```

### Test Chat API

```powershell
$chatResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/ai/chat" -Method POST -Headers @{
  "Authorization" = "Bearer $token"
  "Content-Type" = "application/json"
} -Body (@{
  message = "Explain Realism in IR"
} | ConvertTo-Json)

Write-Host $chatResponse.reply
```

### Test Essay Outline API

```powershell
$outlineResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/ai/essay/outline" -Method POST -Headers @{
  "Authorization" = "Bearer $token"
  "Content-Type" = "application/json"
} -Body (@{
  topic = "Democracy in Pakistan"
} | ConvertTo-Json)

Write-Host $outlineResponse.outline
```

### Test Essay Analysis API

```powershell
$analysisResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/ai/essay/analyze" -Method POST -Headers @{
  "Authorization" = "Bearer $token"
  "Content-Type" = "application/json"
} -Body (@{
  essay = "Your essay text here..."
  topic = "Constitutional development"
} | ConvertTo-Json)

Write-Host $analysisResponse.analysis
```

## 📈 Check Token Usage

Each API response includes token usage stats:

```json
{
  "reply": "AI response...",
  "usage": {
    "promptTokens": 150,
    "completionTokens": 400,
    "totalTokens": 550
  }
}
```

**Typical costs:**
- 550 tokens × $0.03/1000 = $0.0165 (about 1.6 cents)

## 🐛 Troubleshooting

### AI responses are slow
- **Normal:** GPT-4 takes 5-15 seconds
- **Solution:** This is expected, loading states handle it
- **Alternative:** Switch to gpt-3.5-turbo (faster, cheaper) in aiController.js

### "Invalid API key" error
```powershell
# Check your .env file
cat .env | Select-String "OPENAI_API_KEY"
```
- Verify key starts with `sk-`
- Check for extra spaces or quotes
- Ensure no trailing characters

### "Insufficient quota" error
- Go to https://platform.openai.com/account/billing
- Add credits ($5 minimum)
- Check usage dashboard

### Backend not responding
```powershell
# Check if backend is running
Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue
```

If nothing, restart:
```powershell
npm run dev
```

### Database connection issues
```powershell
# Test MongoDB connection
node -e "require('./backend/config/database.js').connectDB()"
```

## ✅ Success Checklist

After testing, you should have:

- ✅ AI Chat responding with CSS-specific answers
- ✅ Essay outlines generated successfully
- ✅ Answer evaluation working with feedback
- ✅ No authentication errors
- ✅ Loading states working properly
- ✅ Error messages displayed if issues occur
- ✅ All responses appear within 15 seconds

## 🎉 Congratulations!

If all tests pass, your AI features are fully operational!

**Your CSS360 Academy app now has:**
- ✅ Real GPT-4 powered AI assistant
- ✅ Essay outline generation
- ✅ Answer evaluation and feedback
- ✅ Production-ready error handling
- ✅ User-friendly interface

## Next Steps

1. Deploy to production (see DEPLOYMENT_GUIDE.md)
2. Set up usage monitoring
3. Implement rate limiting
4. Add response caching
5. Create usage analytics dashboard

---

**Need help?** Check [AI_FEATURES.md](./AI_FEATURES.md) for detailed documentation.
