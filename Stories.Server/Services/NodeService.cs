using System;
using System.Collections.Generic;
using System.Reflection;
using Neo4j.Driver;

public class NodeService<T> where T : class, new()
{
    public Dictionary<string, object> ToProperties(T entity)
    {
        var properties = new Dictionary<string, object>();
        var type = typeof(T);

        foreach (var prop in type.GetProperties(BindingFlags.Public | BindingFlags.Instance))
        {
            var value = prop.GetValue(entity);
            if (value != null)
            {
                if (prop.PropertyType == typeof(Guid))
                {
                    properties[prop.Name] = value.ToString();
                }
                else if (prop.PropertyType == typeof(DateTime))
                {
                    properties[prop.Name] = ((DateTime)value).ToString("o"); // ISO 8601 format
                }
                else if (prop.PropertyType.IsEnum)
                {
                    properties[prop.Name] = value.ToString();
                }
                else
                {
                    properties[prop.Name] = value;
                }
            }
        }

        return properties;
    }

    public T FromNode(INode node)
    {
        var entity = new T();
        var type = typeof(T);

        foreach (var prop in type.GetProperties(BindingFlags.Public | BindingFlags.Instance))
        {
            if (node.Properties.TryGetValue(prop.Name, out var value))
            {
                if (value != null)
                {
                    if (prop.PropertyType.IsEnum)
                    {
                        prop.SetValue(entity, Enum.Parse(prop.PropertyType, value.ToString()));
                    }
                    else if (prop.PropertyType == typeof(Guid))
                    {
                        prop.SetValue(entity, Guid.Parse(value.ToString()));
                    }
                    else if (prop.PropertyType == typeof(DateTime))
                    {
                        prop.SetValue(entity, DateTime.Parse(value.ToString()));
                    }
                    else
                    {
                        prop.SetValue(entity, Convert.ChangeType(value, prop.PropertyType));
                    }
                }
            }
        }

        return entity;
    }
}