'use client';
import React, { useState } from 'react';
import styles from './CreateProfileModal.module.css';

const CreateProfileModal = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        hospitalName: '',
        branchName: '',
        email: '',
        mobile: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
        googleLocation: '',
        logo: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Profile Data:", formData);
        if (onSave) onSave(formData);
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h5>Profile Details</h5>
                    <button className={styles.closeBtn} onClick={onClose}>×</button>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Hospital Name</label>
                            <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label>Branch Name</label>
                            <input type="text" name="branchName" value={formData.branchName} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label>E-mail</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label>Mobile Number</label>
                            <div className="input-group">
                                <span className="input-group-text">+91</span>
                                <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label>Address</label>
                            <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label>City</label>
                            <input type="text" name="city" value={formData.city} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label>State</label>
                            <input type="text" name="state" value={formData.state} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label>Pincode</label>
                            <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label>Country</label>
                            <select name="country" value={formData.country} onChange={handleChange} className="form-select">
                                <option>India</option>
                                <option>USA</option>
                                <option>UK</option>
                                <option>Canada</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label>Hospital Logo <small>(JPG/PNG, Max 3MB)</small></label>
                            <input type="file" name="logo" accept=".jpg,.png" onChange={handleChange} className="form-control" />
                        </div>
                        <div className="col-12">
                            <label>Google Location</label>
                            <input type="text" name="googleLocation" value={formData.googleLocation} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                    <div className={styles.footer}>
                        <button type="submit" className="btn btn-primary">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProfileModal;
