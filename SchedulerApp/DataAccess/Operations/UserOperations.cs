﻿using System.Collections.Generic;
using System.Linq;
using DataAccess.DBAccess;
using DataAccess.Models;
namespace DataAccess.Operations
{
    public class UserOperations : Base
    {
        public UserModel IsValidUser(out bool isValidUser, UserModel userModel)
        {
            User user = entities.Users.FirstOrDefault(u => u.Name == userModel.Name && u.Password == userModel.Password);

            if (user != null)
            {
                userModel.Id = user.UserId;
                isValidUser = true;
            }
            else
            {
                userModel.Id = -1;
                isValidUser = false;
            }

            return userModel;
        }

        public int CreateUser(UserModel model)
        {
            User user = entities.Users.Create();

            user.Name = model.Name;
            user.Password = model.Password;

            entities.Users.Add(user);

            return user.UserId;
        }
    }
}
