using GenericImplementation.Builder.Interfaces;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Reflection;

/// <summary>
/// The Builder namespace.
/// </summary>
namespace GenericImplementation.Builder.Classes
{
    /// <summary>
    /// Class GenericBuilder.
    /// </summary>
    /// <typeparam name="TModel">The type of the t model.</typeparam>
    /// <typeparam name="TEntity">The type of the t entity.</typeparam>
    /// <seealso cref="IBuilder{TModel,TEntity}" />
    public class GenericBuilder<TModel, TEntity> : IGenericBuilder<TModel, TEntity>
    where TModel : class
    where TEntity : class
    {

        /// <summary>
        /// Builds the entity.
        /// This method allow developer to build a viewModel from database model dynamically.
        /// </summary>
        /// <param name="entity">The entity.</param>
        /// <returns>TModel.</returns>
        /// <exception cref="System.Exception"></exception>
        public virtual TModel BuildEntity(TEntity entity)
        {
            try
            {
                if (entity != null)
                {
                    var model = Activator.CreateInstance<TModel>();
                    Type myType = entity.GetType();
                    IList<PropertyInfo> props = new List<PropertyInfo>(myType.GetProperties());
                    foreach (PropertyInfo prop in props)
                    {
                        var propValue = prop.GetValue(entity, null);
                        if (propValue != null && model.GetType().GetProperty(prop.Name) != null)
                        {
                            /// This part of code make sure that any collection is builded automatically to the viewModel list.
                            if (prop.PropertyType.Name.Equals("ICollection`1"))
                            {
                                if(((IEnumerable)propValue).GetEnumerator().MoveNext() != false)
                                {
                                    var typeOfElementModel = model.GetType().GetProperty(prop.Name);
                                    var listType = typeof(List<>);
                                    var genericArgs = typeOfElementModel.PropertyType.GetGenericArguments();
                                    var concreteType = listType.MakeGenericType(genericArgs);
                                    IList relationList = (IList)Activator.CreateInstance(concreteType);
                                    Type relationListTElementType = relationList.GetType().GetGenericArguments()[0];
                                    foreach (var elementOfListEntity in (IEnumerable)propValue)
                                    {
                                        Type elementOfListEntityType = elementOfListEntity.GetType();
                                        IList<PropertyInfo> properties = new List<PropertyInfo>(elementOfListEntityType.GetProperties());
                                        var buildedModel = Activator.CreateInstance(relationListTElementType);
                                        foreach (PropertyInfo property in properties)
                                        {
                                            object propertyValue = property.GetValue(elementOfListEntity, null);
                                            if (propertyValue != null && buildedModel.GetType().GetProperty(property.Name) != null && !property.PropertyType.Namespace.Contains("DataMapping.Models") && !property.PropertyType.Name.Equals("ICollection`1"))
                                            {
                                                buildedModel.GetType().GetProperty(property.Name).SetValue(buildedModel, propertyValue);
                                            }
                                        }
                                        relationList.Add(buildedModel);
                                    }
                                    model.GetType().GetProperty(prop.Name).SetValue(model, relationList);
                                }
                               
                            }
                            /// This part of code make sure that any sub model is builded automatically to the viewModel.
                            else if (prop.PropertyType.Namespace.Contains("DataMapping.Models"))
                            {
                                var typeOfElementModel = model.GetType().GetProperty(prop.Name);
                                var modelObject = Activator.CreateInstance(typeOfElementModel.PropertyType);
                                IList<PropertyInfo> properties = new List<PropertyInfo>(prop.PropertyType.GetProperties());
                                foreach (PropertyInfo property in properties)
                                {
                                    object propertyValue = property.GetValue(propValue, null);
                                    if (propertyValue != null && modelObject.GetType().GetProperty(property.Name) != null && !property.PropertyType.Namespace.Contains("DataMapping.Models") && !property.PropertyType.Name.Equals("ICollection`1"))
                                    {
                                        modelObject.GetType().GetProperty(property.Name).SetValue(modelObject, propertyValue);
                                    }
                                }
                                model.GetType().GetProperty(prop.Name).SetValue(model, modelObject);
                            }
                            else
                            {
                                model.GetType().GetProperty(prop.Name).SetValue(model, propValue);
                            }
                        }

                    }
                    return model;
                }
                throw new Exception();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                throw new Exception();
            }
        }

        /// <summary>
        /// Builds the model.
        /// This method allow developer to build a database model from viewModel dynamically.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>TEntity.</returns>
        /// <exception cref="System.Exception"></exception>
        public virtual TEntity BuildModel(TModel model)
        {
            try
            {
                if (model != null)
                {
                    var entity = Activator.CreateInstance<TEntity>();
                    Type myType = model.GetType();
                    IList<PropertyInfo> props = new List<PropertyInfo>(myType.GetProperties());
                    foreach (PropertyInfo prop in props)
                    {
                        object propValue = prop.GetValue(model, null);
                        if (propValue != null && entity.GetType().GetProperty(prop.Name) != null)
                        {
                            /// This part of code make sure that any collection is builded automatically to the entity list.
                            if (prop.PropertyType.Name.Equals("ICollection`1"))
                            {
                                if (((IEnumerable)propValue).GetEnumerator().MoveNext() != false)
                                {
                                    var typeOfElementEntity = entity.GetType().GetProperty(prop.Name);
                                    var listType = typeof(List<>);
                                    var genericArgs = typeOfElementEntity.PropertyType.GetGenericArguments();
                                    var concreteType = listType.MakeGenericType(genericArgs);
                                    IList relationList = (IList)Activator.CreateInstance(concreteType);
                                    Type relationListTElementType = relationList.GetType().GetGenericArguments()[0];
                                    var propValueCasted = propValue as IList;
                                    if (propValueCasted != null)
                                    {
                                        foreach (var elementOfListModel in (IList)propValue)
                                        {
                                            Type elementOfListModelType = elementOfListModel.GetType();
                                            IList<PropertyInfo> properties = new List<PropertyInfo>(elementOfListModelType.GetProperties());
                                            var buildedEntity = Activator.CreateInstance(relationListTElementType);
                                            foreach (PropertyInfo property in properties)
                                            {
                                                object propertyValue = property.GetValue(elementOfListModel, null);
                                                if (propertyValue != null && buildedEntity.GetType().GetProperty(property.Name) != null && !property.PropertyType.Namespace.Contains("ModelView") && !property.PropertyType.Name.Equals("ICollection`1"))
                                                {
                                                    buildedEntity.GetType().GetProperty(property.Name).SetValue(buildedEntity, propertyValue);
                                                }
                                            }
                                            relationList.Add(buildedEntity);
                                        }
                                        entity.GetType().GetProperty(prop.Name).SetValue(entity, relationList);
                                    }
                                }
                            }
                            /// This part of code make sure that any sub model is builded automatically to the entity.
                            else if (prop.PropertyType.Namespace.Contains("ModelView"))
                            {
                                var typeOfElementEntity = entity.GetType().GetProperty(prop.Name);
                                var entityObject = Activator.CreateInstance(typeOfElementEntity.PropertyType);
                                IList<PropertyInfo> properties = new List<PropertyInfo>(prop.PropertyType.GetProperties());
                                foreach (PropertyInfo property in properties)
                                {
                                    object propertyValue = property.GetValue(propValue, null);
                                    if (propertyValue != null && entityObject.GetType().GetProperty(property.Name) != null && !property.PropertyType.Namespace.Contains("ModelView") && !property.PropertyType.Name.Equals("ICollection`1"))
                                    {
                                        entityObject.GetType().GetProperty(property.Name).SetValue(entityObject, propertyValue);
                                    }
                                }
                                entity.GetType().GetProperty(prop.Name).SetValue(entity, entityObject);
                            }
                            else
                            {
                                entity.GetType().GetProperty(prop.Name).SetValue(entity, propValue);
                            }
                        }
                    }
                    return entity;
                }
                throw new Exception();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                throw new Exception();
            }
        }
    }
}
