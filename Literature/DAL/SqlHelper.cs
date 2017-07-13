/********************************************************************

* 彭涛创建的 2015-11-21
   实现ado.net对数据库基本sql语句的执行，为DAL层实现增、删、插、改提供静态方法
/********************************************************************/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace DAL
{

    public static class SqlHelper
    {
        //找到连接数据库字符串
        private static string conStr = ConfigurationManager.ConnectionStrings["MySQL"].ConnectionString;
        //增删改
        public static int ExecuteNonQuery(string sqlStr, CommandType ct, params SqlParameter[] sq)
        {
            using (SqlConnection sqlCon = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand(sqlStr, sqlCon))
                {
                    cmd.CommandType = ct;
                    if (sq != null)
                    {
                        cmd.Parameters.AddRange(sq);
                    }   
                                 
                    //打开连接
                    sqlCon.Open();
                    return cmd.ExecuteNonQuery();
                }
            }
        }
        //scalar
        public static object ExecuteScalar(string sqlStr, CommandType ct, params SqlParameter[] sq)
        {
            using (SqlConnection sqlCon = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand(sqlStr, sqlCon))
                {
                    cmd.CommandType = ct;
                    if (sq != null)
                    {
                        cmd.Parameters.AddRange(sq);
                    }
                    //打开连接
                    sqlCon.Open();
                    return cmd.ExecuteScalar();
                }
            }
        }
        //reader
        public static SqlDataReader ExecuteReader(string sqlStr, CommandType ct, params SqlParameter[] sq)
        {
            SqlConnection sqlCon = new SqlConnection(conStr);            
            using (SqlCommand cmd = new SqlCommand(sqlStr, sqlCon))
            {
                cmd.CommandType = ct;
                if (sq != null)
                {
                    cmd.Parameters.AddRange(sq);
                }
                //打开连接
                try
                {
                    sqlCon.Open();
                    return cmd.ExecuteReader(CommandBehavior.CloseConnection);
                }
                catch (Exception)
                {
                    sqlCon.Dispose();
                    throw;
                }
            }            
        }
        //datatable
        public static DataTable ExecuteDataTable(string sqlStr, CommandType ct, params SqlParameter[] sq)
        {
            DataTable dt = new DataTable();
            using (SqlDataAdapter sda=new SqlDataAdapter(sqlStr,conStr))
            {
                sda.SelectCommand.CommandType = ct;
                if (sq != null)
                {
                    sda.SelectCommand.Parameters.AddRange(sq);
                }
                sda.Fill(dt);
                return dt;
            }
        }
    }
}
