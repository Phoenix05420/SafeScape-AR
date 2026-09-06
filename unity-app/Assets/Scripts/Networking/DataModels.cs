using System;
using System.Collections.Generic;

namespace SafeScapeAR.Networking
{
    // DTOs matching backend Pydantic schemas

    [Serializable]
    public class UserData
    {
        public string id;
        public string username;
        public string organization;
    }

    [Serializable]
    public class AuthResponse
    {
        public string token;
        public UserData user;
    }

    [Serializable]
    public class TrainingSessionData
    {
        public string sessionId;
        public string userId;
        public string moduleId;
        public float score;
        public DateTime startTime;
        public DateTime endTime;
        public List<Assessment.TaskResult> taskResults;
    }
}
